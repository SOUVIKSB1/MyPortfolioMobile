import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, User, Briefcase, Calendar, Award, Mail, MessageSquare, Share2, Check } from "lucide-react";
import { useBackHandler } from "./hooks/useBackHandler";
import { triggerHaptic } from "./hooks/haptics";

import StartAnimation from "./components/StartAnimation";
import CyberCanvas from "./components/CyberCanvas";
import PullToRefresh from "./components/PullToRefresh";
import InstallPrompt from "./components/InstallPrompt";
import MatrixRain from "./components/MatrixRain";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Journey from "./pages/Journey";
import Credentials from "./pages/Credentials";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

// Index tabs to calculate slider directions
const TABS = ["home", "about", "work", "journey", "credentials", "reviews", "contact"];

// 7 Distinct Cyber Colors for the 7 Panels
const TAB_THEMES = {
  home: {
    color: "#ff5f00",        // Neon Cyber Orange
    glow: "rgba(255, 95, 0, 0.85)",
    highlight: "rgba(255, 95, 0, 0.22)"
  },
  about: {
    color: "#00d2ff",        // Electric Cyan Blue
    glow: "rgba(0, 210, 255, 0.85)",
    highlight: "rgba(0, 210, 255, 0.22)"
  },
  work: {
    color: "#10b981",        // Neon Emerald Green
    glow: "rgba(16, 185, 129, 0.85)",
    highlight: "rgba(16, 185, 129, 0.22)"
  },
  journey: {
    color: "#a855f7",        // Cyber Violet Purple
    glow: "rgba(168, 85, 247, 0.85)",
    highlight: "rgba(168, 85, 247, 0.22)"
  },
  credentials: {
    color: "#fbbf24",        // Radiant Amber Gold
    glow: "rgba(251, 191, 36, 0.85)",
    highlight: "rgba(251, 191, 36, 0.22)"
  },
  reviews: {
    color: "#ec4899",        // Hot Neon Pink
    glow: "rgba(236, 72, 153, 0.85)",
    highlight: "rgba(236, 72, 153, 0.22)"
  },
  contact: {
    color: "#ff2e63",        // Laser Crimson Red
    glow: "rgba(255, 46, 99, 0.85)",
    highlight: "rgba(255, 46, 99, 0.22)"
  }
};

// High-fidelity iOS spring page variants with depth and smooth velocity
const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
    filter: "blur(3px)"
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
      opacity: { duration: 0.22, ease: "easeOut" },
      scale: { duration: 0.22, ease: "easeOut" },
      filter: { duration: 0.2, ease: "easeOut" }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.97,
    filter: "blur(3px)",
    transition: {
      x: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
      opacity: { duration: 0.18, ease: "easeIn" },
      scale: { duration: 0.18, ease: "easeIn" },
      filter: { duration: 0.18, ease: "easeIn" }
    }
  })
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isExitingLoader, setIsExitingLoader] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [direction, setDirection] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  const scrollContainerRef = useRef(null);
  const lastScrollTickRef = useRef(0);
  const navRef = useRef(null);

  const [showShareToast, setShowShareToast] = useState(false);

  const handleShare = async () => {
    triggerHaptic(15);
    const shareData = {
      title: "Souvik Sinhababu | Mobile Portfolio",
      text: "Explore Souvik Sinhababu's developer portfolio!",
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          copyShareLink(shareData.url);
        }
      }
    } else {
      copyShareLink(shareData.url);
    }
  };

  const copyShareLink = (url) => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 2400);
      });
    } else {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2400);
    }
  };

  const handleStartExit = () => {
    setIsExitingLoader(true);
  };

  const handleComplete = () => {
    setLoading(false);
  };

  const handleScroll = (e) => {
    const currentScrollTop = e.target.scrollTop;
    setScrollTop(currentScrollTop);
    
    // Smooth gear notch scroll haptic feedback (tick every 180px)
    if (Math.abs(currentScrollTop - lastScrollTickRef.current) > 180) {
      lastScrollTickRef.current = currentScrollTop;
      triggerHaptic(5); // tiny physical click feel (5ms)
    }
  };

  const handleNavigate = (pageId) => {
    const currentIndex = TABS.indexOf(activePage);
    const targetIndex = TABS.indexOf(pageId);
    
    if (targetIndex !== currentIndex && targetIndex !== -1) {
      triggerHaptic(12); // light tap haptic feedback (12ms)
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setActivePage(pageId);
      setScrollTop(0); // Reset scroll tracker state
      lastScrollTickRef.current = 0; // Reset scroll tick tracker position
      
      // Auto-scroll the content page container to top on page switches
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  // ── Drag & Swipe gesture for full-screen finger slide page changes ───────────
  const handleDragEnd = (event, info) => {
    const swipeDistance = info.offset.x;
    const swipeVelocity = info.velocity.x;
    const currentIndex = TABS.indexOf(activePage);

    // Swipe left (dragging finger to left) -> go to next tab
    if ((swipeDistance < -45 || swipeVelocity < -350) && currentIndex < TABS.length - 1) {
      handleNavigate(TABS[currentIndex + 1]);
    }
    // Swipe right (dragging finger to right) -> go to previous tab
    else if ((swipeDistance > 45 || swipeVelocity > 350) && currentIndex > 0) {
      handleNavigate(TABS[currentIndex - 1]);
    }
  };

  // ── Navbar touch scrub gesture handler (slide finger along tabs) ───────────
  const handleNavTouch = (e) => {
    if (!navRef.current) return;
    const touch = e.touches ? e.touches[0] : e;
    if (!touch) return;
    const navRect = navRef.current.getBoundingClientRect();
    const touchX = touch.clientX - navRect.left;
    const tabWidth = navRect.width / TABS.length;
    const targetIndex = Math.max(0, Math.min(TABS.length - 1, Math.floor(touchX / tabWidth)));
    const targetTab = TABS[targetIndex];
    if (targetTab && targetTab !== activePage) {
      handleNavigate(targetTab);
    }
  };

  // ── Back button / gesture handler ──────────────────────────────────────────
  useBackHandler(activePage, handleNavigate, TABS);

  const getNavLabel = (tab) => {
    switch (tab) {
      case "home": return "Home";
      case "about": return "About";
      case "work": return "Showcases";
      case "journey": return "Journey";
      case "credentials": return "Aura";
      case "reviews": return "Reviews";
      case "contact": return "Ping";
      default: return "";
    }
  };

  const getNavIcon = (tab, size = 18) => {
    switch (tab) {
      case "home": return <HomeIcon size={size} className="nav-icon" />;
      case "about": return <User size={size} className="nav-icon" />;
      case "work": return <Briefcase size={size} className="nav-icon" />;
      case "journey": return <Calendar size={size} className="nav-icon" />;
      case "credentials": return <Award size={size} className="nav-icon" />;
      case "reviews": return <MessageSquare size={size} className="nav-icon" />;
      case "contact": return <Mail size={size} className="nav-icon" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Intro hacker loading sequence */}
      {loading && (
        <StartAnimation 
          onStartExit={handleStartExit} 
          onComplete={handleComplete} 
        />
      )}

      {/* Main app viewport */}
      {(isExitingLoader || !loading) && (
        <div className="app-viewport">
          {/* Cyber backgrounds */}
          <CyberCanvas activePage={activePage} />
          <div className="grid-bg" />
          <div className="glow-blob glow-orange" />
          <div className="glow-blob glow-blue" />
          <div className="grain-overlay" />

          {/* Pull-to-Refresh indicator */}
          <PullToRefresh scrollContainerRef={scrollContainerRef} />

          {/* Floating Share Link Toast */}
          <AnimatePresence>
            {showShareToast && (
              <motion.div 
                className="share-toast"
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
              >
                <Check size={14} style={{ color: "#10b981" }} />
                <span>Portfolio link copied! 🚀</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Sticky Header - fades out on scroll, hidden on other pages */}
          <header 
            className="app-header"
            style={{
              opacity: activePage === "home" ? (scrollTop > 20 ? 0 : 1) : 0,
              transform: activePage === "home" ? (scrollTop > 20 ? "translateY(-10px)" : "translateY(0)") : "translateY(-10px)",
              pointerEvents: (activePage === "home" && scrollTop <= 20) ? "auto" : "none",
              transition: "opacity 0.25s ease, transform 0.25s ease"
            }}
          >
            <div className="logo-text">
              {"< "}<span>Souvik</span>{" ./>"}
            </div>
            
            <div className="header-actions">
              <button 
                onClick={handleShare}
                className="header-share-btn"
                aria-label="Share Portfolio"
                title="Share Portfolio"
              >
                <Share2 size={12} />
                <span>SHARE</span>
              </button>
              <div className="header-status">
                <span className="status-pulse" />
                <span>ONLINE</span>
              </div>
            </div>
          </header>

          {/* Page Scroll Panel */}
          <div 
            ref={scrollContainerRef} 
            onScroll={handleScroll}
            className="page-scroll-container"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activePage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={handleDragEnd}
                style={{ 
                  width: "100%", 
                  height: "auto", 
                  willChange: "transform, opacity",
                  touchAction: "pan-y" 
                }}
              >
                {activePage === "home" && (
                  <Home 
                    onNavigate={handleNavigate} 
                    onTriggerMatrix={() => setIsMatrixOpen(true)} 
                  />
                )}
                {activePage === "about" && <About />}
                {activePage === "work" && <Work />}
                {activePage === "journey" && <Journey />}
                {activePage === "credentials" && <Credentials />}
                {activePage === "reviews" && <Reviews />}
                {activePage === "contact" && <Contact />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Full-Screen Matrix Rain Easter Egg */}
          <MatrixRain 
            isOpen={isMatrixOpen} 
            onClose={() => setIsMatrixOpen(false)} 
          />

          {/* PWA Floating Install Prompt */}
          <InstallPrompt />

          {/* iOS Instagram Style Liquid Glass Navbar */}
          <nav 
            ref={navRef}
            className="bottom-nav"
            onTouchStart={handleNavTouch}
            onTouchMove={handleNavTouch}
          >
            {/* Top specular highlight shimmer */}
            <div className="nav-glass-sheen" />

            {TABS.map((tab) => {
              const isActive = activePage === tab;
              const theme = TAB_THEMES[tab] || TAB_THEMES.home;
              return (
                <motion.button
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  aria-label={`Navigate to ${tab}`}
                  whileTap={{ scale: 0.88 }}
                  style={{
                    color: isActive ? theme.color : undefined
                  }}
                >
                  {/* Dynamic 7-Color Highlight backdrop for active tab */}
                  {isActive && (
                    <motion.div 
                      className="nav-active-highlight"
                      layoutId="activeNavHighlight"
                      style={{
                        background: `radial-gradient(circle at center, ${theme.highlight} 0%, rgba(255, 255, 255, 0.02) 75%, transparent 100%)`,
                        boxShadow: `0 0 18px ${theme.highlight}`
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 440,
                        damping: 32,
                        mass: 0.65
                      }}
                    />
                  )}

                  <motion.div 
                    className="nav-icon-wrap"
                    style={{
                      filter: isActive ? `drop-shadow(0 0 8px ${theme.glow})` : undefined
                    }}
                    animate={{
                      scale: isActive ? 1.14 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 24 }}
                  >
                    {getNavIcon(tab)}
                  </motion.div>

                  <span 
                    className="nav-label"
                    style={{
                      color: isActive ? theme.color : undefined,
                      fontWeight: isActive ? 700 : 600
                    }}
                  >
                    {getNavLabel(tab)}
                  </span>
                  
                  {/* 7-Color Dynamic glowing active dot */}
                  {isActive && (
                    <motion.span 
                      className="nav-active-dot"
                      layoutId="activeNavDot"
                      style={{
                        backgroundColor: theme.color,
                        boxShadow: `0 0 8px ${theme.color}, 0 0 14px ${theme.glow}`
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Portal target for bottom sheets/modals to render outside scroll context but inside the viewport */}
          <div id="portal-root" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1000 }} />
        </div>
      )}
    </>
  );
}
