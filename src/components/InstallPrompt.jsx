import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, Share } from "lucide-react";
import { triggerHaptic } from "../hooks/haptics";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSTip, setShowIOSTip] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isStandalone) return;

    // Check if user dismissed prompt recently (24h cooldown)
    const lastDismissed = localStorage.getItem("pwa_prompt_dismissed");
    if (lastDismissed && Date.now() - parseInt(lastDismissed, 10) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Android / Chrome handler
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Wait 3.5 seconds after load before gently showing prompt
      setTimeout(() => setShowPrompt(true), 3500);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // If iOS Safari and not standalone, show prompt after 4 seconds
    if (isIosDevice && !isStandalone) {
      const timer = setTimeout(() => setShowPrompt(true), 4000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      };
    }

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    triggerHaptic(15);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSTip(true);
    }
  };

  const handleDismiss = () => {
    triggerHaptic(10);
    setShowPrompt(false);
    setShowIOSTip(false);
    localStorage.setItem("pwa_prompt_dismissed", Date.now().toString());
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          className="install-pwa-banner"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <div className="install-banner-content">
            <div className="install-banner-icon">
              <span>⚡</span>
            </div>
            <div className="install-banner-text">
              <span className="install-banner-title">Install App Experience</span>
              <span className="install-banner-subtitle">
                {showIOSTip 
                  ? "Tap Share ⎋ then 'Add to Home Screen ➕'" 
                  : "Add to home screen for fluid full-screen speed"}
              </span>
            </div>
          </div>

          <div className="install-banner-actions">
            {!showIOSTip ? (
              <button 
                onClick={handleInstallClick} 
                className="install-action-btn"
                aria-label="Install App"
              >
                {isIOS ? <Share size={13} /> : <Download size={13} />}
                <span>{isIOS ? "How to Add" : "Install"}</span>
              </button>
            ) : null}
            
            <button 
              onClick={handleDismiss} 
              className="install-dismiss-btn"
              aria-label="Dismiss banner"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
