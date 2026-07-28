/**
 * Utility helper to trigger haptic vibration feedback on mobile devices.
 * Uses the Web Vibration API if supported by the browser.
 * 
 * @param {number|number[]} pattern - Duration in ms or pattern array (e.g. 15 for single tap, [20, 50, 20] for double tap)
 */
export const triggerHaptic = (pattern = 15) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // ignore security or user-activation errors silently
    }
  }
};
