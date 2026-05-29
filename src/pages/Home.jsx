import { useState, useEffect, useRef } from "react";
import { Download, Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import profileImg from "../assets/hero.png";
import TiltCard from "../components/TiltCard";
import "./Home.css";

const COMMANDS = [
  "docker build -t portfolio:v2 .",
  "gcloud deploy --gke-prod",
  "npm run build:prod",
  "kubectl get pods -w",
  "ping google.com -c 1",
  "status: GKE active (24ms)"
];

function CounterTicker({ value, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
}

export default function Home({ onNavigate }) {
  const [typingText, setTypingText] = useState("");
  const [linkedinCount, setLinkedinCount] = useState(1481);
  const [instagramCount, setInstagramCount] = useState(1043);
  const [syncStatus, setSyncStatus] = useState("Listening for updates...");
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [imageError, setImageError] = useState(false);

  // Dynamic B.Tech year calculations
  const btechStartYear = 2023;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const academicYear = currentYear - btechStartYear + (currentMonth >= 6 ? 1 : 0);
  const suffix = academicYear === 1 ? "st" : academicYear === 2 ? "nd" : academicYear === 3 ? "rd" : "th";
  const dynamicBtechYear = `${academicYear}${suffix}`;

  // Auto-typing command simulation loop
  useEffect(() => {
    let cmdIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer;

    const handleType = () => {
      const currentCmd = COMMANDS[cmdIndex];
      if (!isDeleting) {
        setTypingText(currentCmd.substring(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentCmd.length) {
          isDeleting = true;
          typingSpeed = 2000; // Pause at full word
        } else {
          typingSpeed = 80 + Math.random() * 40;
        }
      } else {
        setTypingText(currentCmd.substring(0, charIndex - 1));
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          cmdIndex = (cmdIndex + 1) % COMMANDS.length;
          typingSpeed = 500; // Pause before typing next
        } else {
          typingSpeed = 40; // Speed of deletion
        }
      }
      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, []);

  // Live count randomized updates and clock ticker
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setLinkedinCount((prev) => prev + (Math.random() > 0.5 ? 1 : 0));
      }
      if (Math.random() > 0.6) {
        setInstagramCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      }
      
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setSyncStatus("API feed synced successfully");
      
      setTimeout(() => {
        setSyncStatus("Listening for updates...");
      }, 1500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page-container">
      {/* Spacer to push Home content down below sticky header bar */}
      <div className="home-top-spacer" style={{ height: "48px", width: "100%", flexShrink: 0 }} />

      {/* Hero Badge Tag */}
      <div className="home-tag">
        <span className="dot" />
        Let's Build Something Great
      </div>

      {/* Profile/Terminal Header Card with 3D Tilt and custom border glow */}
      <TiltCard className="hero-profile-card glow-border-card">
        <div className="profile-top">
          <div className="avatar-wrapper border-orange-glow">
            {imageError ? (
              <div className="avatar-fallback">SS</div>
            ) : (
                <img 
                  src={profileImg} 
                  alt="Souvik Sinhababu" 
                  className="profile-avatar"
                  onError={() => setImageError(true)}
                />
            )}
          </div>
          <div className="profile-identity">
            <h1 className="name-title">
              <span className="text-gradient-blue">Souvik </span>
              
              <span className="text-gradient-orange"> Sinhababu</span>
            </h1>
            <p className="role-subtitle">Software Engineer & Cloud Explorer</p>
          </div>
        </div>

        <p className="hero-bio">
          Techno Main Salt Lake CSE student. Specializing in bridging high-fidelity React frontends with containerized DevOps deployment on Google Kubernetes Engine.
        </p>

        {/* Terminal panel */}
        <div className="console-panel">
          <div className="console-header">
            <div className="console-controls">
              <span className="c-dot red" />
              <span className="c-dot yellow" />
              <span className="c-dot green" />
            </div>
            <span className="console-title">status.sh</span>
          </div>
          <div className="console-body">
            <div className="console-line">
              <span className="c-prompt">souvik@dev:~$</span> <span className="c-text">cat profile.json</span>
            </div>
            <div className="console-output">
              {"{"}
              <br />
              &nbsp;&nbsp;"role": "CS_Engineer",
              <br />
              &nbsp;&nbsp;"focus": "Cloud_DevOps",
              <br />
              &nbsp;&nbsp;"hackathon": "SIH_Finalist",
              <br />
              &nbsp;&nbsp;"ping": "<span className="c-ping">24ms</span>"
              <br />
              {"}"}
            </div>
            <div className="console-typing">
              <span className="c-prompt">souvik@dev:~$</span> <span className="c-type-text">{typingText}</span><span className="c-cursor">_</span>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Quick Stats Grid */}
      <div className="home-stats-grid">
        <div className="stat-item glass-panel border-orange-glow">
          <h3 className="stat-number"><CounterTicker value={6} />+</h3>
          <p className="stat-label">Projects</p>
        </div>
        <div className="stat-item glass-panel">
          <h3 className="stat-number">{dynamicBtechYear}</h3>
          <p className="stat-label">Year B.Tech</p>
        </div>
        <div className="stat-item glass-panel border-blue-glow">
          <h3 className="stat-number"><CounterTicker value={15} />+</h3>
          <p className="stat-label">Certificates</p>
        </div>
      </div>

      {/* Live Social Sync Hub */}
      <div className="live-hub-card glass-panel border-blue-glow">
        <div className="live-header">
          <div className="live-indicator">
            <span className="live-dot" />
            <span>Connect Hub</span>
          </div>
          <span className="live-status">{syncStatus}</span>
        </div>

        <div className="live-metrics-grid">
          <a 
            href="https://linkedin.com/in/souviksinhababu" 
            target="_blank" 
            rel="noreferrer" 
            className="live-metric-box linkedin"
          >
            <div className="metric-icon">
              <FaLinkedin size={18} />
            </div>
            <div className="metric-info">
              <span className="metric-label">LinkedIn Connections</span>
              <h4 className="metric-value">{linkedinCount}</h4>
            </div>
            <div className="pulse-glow orange" />
          </a>

          <a 
            href="https://instagram.com/sinhababu_souvik" 
            target="_blank" 
            rel="noreferrer" 
            className="live-metric-box instagram"
          >
            <div className="metric-icon">
              <FaInstagram size={18} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Instagram Audience</span>
              <h4 className="metric-value">{instagramCount}</h4>
            </div>
            <div className="pulse-glow blue" />
          </a>
        </div>

        <div className="live-footer">
          <span>@Souvik_Sinhababu</span>
          <span>Last sync: {lastUpdated}</span>
        </div>
      </div>

      {/* Main Page Actions */}
      <div className="home-actions">
        <button 
          onClick={() => onNavigate("work")} 
          className="btn-primary flex-1"
        >
          View Projects
          <ExternalLink size={16} />
        </button>
        <a 
          href="/Souvik_Sinhababu_CV.pdf" 
          download="Souvik_Sinhababu_CV.pdf" 
          className="btn-secondary flex-1"
        >
          <Download size={16} />
          Resume (PDF)
        </a>
      </div>
    </div>
  );
}
