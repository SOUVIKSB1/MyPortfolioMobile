import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import "./BottomSheet.css";

export default function BottomSheet({ isOpen, onClose, title, children }) {
  // Prevent parent viewport scrolling when the bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleDragEnd = (event, info) => {
    // Dismiss sheet if dragged down more than 120px or swiped down with speed
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="bottom-sheet-root">
          {/* Backdrop overlay */}
          <motion.div
            className="bottom-sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Draggable Drawer Sheet */}
          <motion.div
            className="bottom-sheet-container"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            drag="y"
            dragDirectionLock
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.8 }}
            onDragEnd={handleDragEnd}
          >
            {/* Drag Handle Bar */}
            <div className="bottom-sheet-header">
              <div className="bottom-sheet-drag-handle" />
              {title && <h3 className="bottom-sheet-title">{title}</h3>}
              <button 
                className="bottom-sheet-close-btn" 
                onClick={onClose}
                aria-label="Close sheet"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Sheet Content */}
            <div 
              className="bottom-sheet-content"
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag logic from locking inside scroll content
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
