/**
 * useBackHandler.js
 *
 * Custom React hook for handling the system/browser back button (or swipe gesture)
 * in the mobile portfolio PWA.
 *
 * Behaviour:
 * 1. Every time the active tab changes, a browser history entry is pushed
 *    so the native back button fires a popstate event.
 * 2. On popstate:
 *    a. If there is a previous tab in the in-app history stack → navigate to it.
 *    b. If already on the root/home tab with no history → show a toast.
 *       A second press within 2 seconds closes the app (window.close / PWA fallback).
 */

import { useEffect, useRef, useCallback } from 'react';

/** Root tabs where pressing back should prompt exit instead of going further back. */
const ROOT_TABS = new Set(['home']);

/**
 * Creates and shows a bottom toast notification.
 * Automatically fades out after `durationMs` milliseconds.
 *
 * @param {string} message
 * @param {number} [durationMs=2000]
 */
function showExitToast(message, durationMs = 2000) {
  const existing = document.getElementById('back-exit-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'back-exit-toast';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);

  // Trigger the CSS enter transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('back-exit-toast--visible');
    });
  });

  // Schedule removal
  const timer = setTimeout(() => {
    toast.classList.remove('back-exit-toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, durationMs);

  return () => {
    clearTimeout(timer);
    toast.remove();
  };
}

/**
 * Attempts to close the PWA / browser tab.
 * window.close() is often blocked in standalone PWA; fall back to collapsing
 * the history stack (effective on Android TWA / Chrome custom tabs).
 */
function exitApp() {
  try { window.close(); } catch (_) {}
  setTimeout(() => {
    try { history.go(-(history.length + 1)); } catch (_) {}
  }, 80);
}

/**
 * @param {string}   activePage      - The currently displayed tab id.
 * @param {Function} onNavigate      - Callback to change the active tab: (pageId) => void.
 * @param {string[]} tabs            - Ordered list of all tab ids.
 */
export function useBackHandler(activePage, onNavigate, tabs) {
  /**
   * In-app navigation history stack.
   * Each entry is a tab id string.
   */
  const navHistoryRef = useRef([]);

  /** Whether the user already pressed back once (for double-press exit). */
  const backPressedOnceRef = useRef(false);
  const backTimerRef = useRef(null);

  /** Keep a stable ref to the navigate callback. */
  const onNavigateRef = useRef(onNavigate);
  useEffect(() => { onNavigateRef.current = onNavigate; }, [onNavigate]);

  /** Keep a stable ref to the activePage. */
  const activePageRef = useRef(activePage);
  useEffect(() => { activePageRef.current = activePage; }, [activePage]);

  // ─── Push a browser history entry whenever the active tab changes ────────
  useEffect(() => {
    // Push into in-app stack (avoid duplicates on consecutive same-tab calls)
    const stack = navHistoryRef.current;
    if (stack[stack.length - 1] !== activePage) {
      stack.push(activePage);
    }

    // Always push a browser state entry so back button fires popstate
    history.pushState({ _portfolio: true, tab: activePage }, '');
  }, [activePage]);

  // ─── Popstate handler (fires on back button / swipe) ─────────────────────
  const handlePopState = useCallback((e) => {
    // Only react to states we created
    if (!e.state || !e.state._portfolio) return;

    const stack = navHistoryRef.current;

    // Navigate backwards in the in-app stack
    if (stack.length > 1) {
      stack.pop(); // remove current
      const previousTab = stack[stack.length - 1];
      stack.pop(); // onNavigate → useEffect will re-push it
      onNavigateRef.current(previousTab);
      return;
    }

    // Already on a root tab — handle double-press exit
    const current = activePageRef.current;
    if (ROOT_TABS.has(current)) {
      if (backPressedOnceRef.current) {
        // Second press within 2s → exit
        clearTimeout(backTimerRef.current);
        backPressedOnceRef.current = false;
        exitApp();
      } else {
        // First press → show toast, re-push so next back fires popstate again
        backPressedOnceRef.current = true;
        showExitToast('Press back again to exit');

        history.pushState({ _portfolio: true, tab: current }, '');

        backTimerRef.current = setTimeout(() => {
          backPressedOnceRef.current = false;
        }, 2000);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(backTimerRef.current);
    };
  }, [handlePopState]);
}
