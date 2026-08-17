import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Terminal } from "lucide-react";
import { triggerHaptic } from "../hooks/haptics";

export default function MatrixRain({ isOpen, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Set canvas dimensions
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // Characters: Matrix katakana, binary, hex, and cyber symbols
    const chars = "010101010101XYZABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ9876543210#$&%*+=-~<>λπΩ";
    const charArray = chars.split("");

    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -50);
    }

    // Touch ripple position
    let rippleX = -100;
    let rippleY = -100;
    let rippleRadius = 0;

    const render = () => {
      // Semi-transparent background fade
      ctx.fillStyle = "rgba(4, 6, 8, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading character is bright cyan/white
        ctx.fillStyle = "#ffffff";
        ctx.fillText(char, x, y);

        // Trailing characters are neon emerald / cyber green
        ctx.fillStyle = "#10b981";
        ctx.shadowColor = "#10b981";
        ctx.shadowBlur = 8;
        ctx.fillText(char, x, y - fontSize);
        ctx.shadowBlur = 0;

        // Reset drop when past bottom or randomly
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      // Draw touch ripple if active
      if (rippleRadius > 0 && rippleRadius < 120) {
        ctx.beginPath();
        ctx.arc(rippleX, rippleY, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 210, 255, ${1 - rippleRadius / 120})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        rippleRadius += 4;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Touch / move interaction
    const handleTouch = (e) => {
      const touch = e.touches ? e.touches[0] : e;
      if (touch) {
        rippleX = touch.clientX;
        rippleY = touch.clientY;
        rippleRadius = 10;
        triggerHaptic(5);
      }
    };

    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("mousemove", handleTouch);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("mousemove", handleTouch);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="matrix-rain-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <canvas ref={canvasRef} className="matrix-canvas" />

          {/* Top Bar Header */}
          <div className="matrix-top-bar">
            <div className="matrix-header-badge">
              <Terminal size={14} className="matrix-term-icon" />
              <span>MATRIX OVERRIDE // ACTIVE</span>
            </div>
            <button
              onClick={() => {
                triggerHaptic(10);
                onClose();
              }}
              className="matrix-close-btn"
              aria-label="Exit Matrix Mode"
            >
              <X size={18} />
            </button>
          </div>

          {/* Bottom Hint */}
          <div className="matrix-bottom-hint">
            <span>Touch or drag screen to distort quantum streams</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
