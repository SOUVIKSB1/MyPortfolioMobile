import { useEffect, useRef, useState } from "react";
import "./PullToRefresh.css";

const THRESHOLD = 72;   // px of pull needed to trigger refresh
const MAX_PULL  = 100;  // px cap so it doesn't over-stretch

export default function PullToRefresh({ scrollContainerRef }) {
  const [pullY, setPullY]         = useState(0);   // 0-MAX_PULL
  const [triggered, setTriggered] = useState(false);
  const [releasing, setReleasing] = useState(false);

  const startYRef    = useRef(null);
  const isPullingRef = useRef(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      // Only start if we're at the very top of the scroll container
      if (el.scrollTop > 0) return;
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    };

    const onTouchMove = (e) => {
      if (!isPullingRef.current || startYRef.current === null) return;
      const delta = e.touches[0].clientY - startYRef.current;
      if (delta <= 0) {
        // Scrolling up — cancel pull tracking
        isPullingRef.current = false;
        setPullY(0);
        return;
      }
      // Prevent the page from scrolling while we're tracking a pull
      if (el.scrollTop === 0) {
        e.preventDefault();
      }
      const capped = Math.min(delta * 0.5, MAX_PULL); // resistance factor 0.5
      setPullY(capped);
      if (capped >= THRESHOLD && !triggered) {
        setTriggered(true);
      } else if (capped < THRESHOLD && triggered) {
        setTriggered(false);
      }
    };

    const onTouchEnd = () => {
      if (!isPullingRef.current) return;
      isPullingRef.current = false;
      startYRef.current = null;

      if (triggered) {
        setReleasing(true);
        setPullY(THRESHOLD); // hold indicator visible briefly
        setTimeout(() => {
          window.location.reload();
        }, 600);
      } else {
        setReleasing(true);
        setPullY(0);
        setTimeout(() => {
          setReleasing(false);
          setTriggered(false);
        }, 300);
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [scrollContainerRef, triggered]);

  // Nothing to show when not pulling
  if (pullY === 0 && !releasing) return null;

  const progress  = Math.min(pullY / THRESHOLD, 1);       // 0-1
  const rotation  = progress * 360;                       // spinner degrees
  const scale     = 0.4 + progress * 0.6;                 // grow as user pulls
  const opacity   = progress;

  return (
    <div
      className={`ptr-wrapper ${triggered ? "triggered" : ""} ${releasing ? "releasing" : ""}`}
      style={{ height: `${pullY}px` }}
      aria-hidden="true"
    >
      <div
        className="ptr-indicator"
        style={{
          transform: `scale(${scale}) rotate(${triggered ? rotation * 2 : rotation}deg)`,
          opacity,
        }}
      >
        {triggered ? (
          // Release icon — checkmark ring
          <svg viewBox="0 0 24 24" fill="none" className="ptr-icon triggered-icon">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="63" strokeDashoffset="0" />
            <path d="M7 12.5l3.5 3.5 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          // Pull icon — arrow circle
          <svg viewBox="0 0 24 24" fill="none" className="ptr-icon">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"
              strokeDasharray="63"
              strokeDashoffset={`${63 - 63 * progress}`}
              strokeLinecap="round"
            />
            <path d="M12 8v8M9 13l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      <span className="ptr-label">
        {triggered ? "Release to refresh" : "Pull to refresh"}
      </span>
    </div>
  );
}
