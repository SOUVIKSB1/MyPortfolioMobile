import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, User, Briefcase, Calendar, Award, Mail, MessageSquare } from "lucide-react";

import StartAnimation from "./components/StartAnimation";
import CyberCanvas from "./components/CyberCanvas";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Journey from "./pages/Journey";
import Credentials from "./pages/Credentials";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";

// Index tabs to calculate slider directions
const TABS = ["home", "about", "work", "journey", "credentials", "reviews", "contact"];

// Variants for direction-aware page transitions
const pageVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 }
    }
  })
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isExitingLoader, setIsExitingLoader] = useState(false);
  const [activePage, setActivePage] = useState("home");
  const [direction, setDirection] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const scrollContainerRef = useRef(null);

  const handleStartExit = () => {
    setIsExitingLoader(true);
  };

  const handleComplete = () => {
    setLoading(false);
  };

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const handleNavigate = (pageId) => {
    const currentIndex = TABS.indexOf(activePage);
    const targetIndex = TABS.indexOf(pageId);
    
    if (targetIndex !== currentIndex) {
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setActivePage(pageId);
      setScrollTop(0); // Reset scroll tracker state
      
      // Auto-scroll the content page container to top on page switches
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    }
  };

  const getNavLabel = (tab) => {
    switch (tab) {
      case "home": return "Home";
      case "about": return "About";
      case "work": return "Projects";
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
            <div className="header-status">
              <span className="status-pulse" />
              <span>ONLINE</span>
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
                style={{ width: "100%", height: "auto", willChange: "transform, opacity" }}
              >
                {activePage === "home" && <Home onNavigate={handleNavigate} />}
                {activePage === "about" && <About />}
                {activePage === "work" && <Work />}
                {activePage === "journey" && <Journey />}
                {activePage === "credentials" && <Credentials />}
                {activePage === "reviews" && <Reviews />}
                {activePage === "contact" && <Contact />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Native Tab Navigation */}
          <nav className="bottom-nav">
            {TABS.map((tab) => {
              const isActive = activePage === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  aria-label={`Navigate to ${tab}`}
                >
                  {getNavIcon(tab)}
                  <span>{getNavLabel(tab)}</span>
                  
                  {/* Neon active tab glow line */}
                  {isActive && (
                    <motion.div 
                      className="nav-indicator"
                      layoutId="activeNavLine"
                    />
                  )}
                </button>
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
