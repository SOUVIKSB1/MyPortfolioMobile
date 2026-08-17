import { useState, useEffect, useRef } from "react";
import { Download, Mail, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaEye, FaStar } from "react-icons/fa";
import profileImg from "../assets/hero.png";
import TiltCard from "../components/TiltCard";
import { PROJECTS } from "./Work";
import { CERTIFICATIONS } from "./Credentials";
import "./Home.css";

const COMMANDS = [
  "docker build -t app .",
  "gcloud deploy --gke",
  "npm run build",
  "kubectl get pods",
  "ping cloud.google.com",
  "git push origin main"
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

export default function Home({ onNavigate, onTriggerMatrix }) {
  const [typingText, setTypingText] = useState("");
  const [linkedinCount, setLinkedinCount] = useState(1481);
  const [instagramCount, setInstagramCount] = useState(1043);
  const [githubRepos, setGithubRepos] = useState(18);
  const [recentCommit, setRecentCommit] = useState({ repo: "MyPortfolioMobile", msg: "style: elevate gaps, card padding, typography", time: "just now" });
  const [visitCount, setVisitCount] = useState(null);
  const [reviewCount, setReviewCount] = useState(null);
  const [syncStatus, setSyncStatus] = useState("Listening for updates...");
  const [lastUpdated, setLastUpdated] = useState("just now");
  const [imageError, setImageError] = useState(false);

  // Interactive Terminal State
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const terminalInputRef = useRef(null);
  const lastAvatarTapRef = useRef(0);

  const handleAvatarDoubleTap = () => {
    const now = Date.now();
    if (now - lastAvatarTapRef.current < 350) {
      if (onTriggerMatrix) onTriggerMatrix();
    }
    lastAvatarTapRef.current = now;
  };

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

  // Fetch Live GitHub stats & recent commits
  useEffect(() => {
    fetch("https://api.github.com/users/SOUVIKSB1")
      .then((r) => r.json())
      .then((data) => {
        if (data.public_repos) {
          setGithubRepos(data.public_repos);
        }
      })
      .catch(() => {});

    fetch("https://api.github.com/users/SOUVIKSB1/events/public?per_page=5")
      .then((r) => r.json())
      .then((events) => {
        if (Array.isArray(events) && events.length > 0) {
          const pushEvent = events.find((e) => e.type === "PushEvent") || events[0];
          if (pushEvent) {
            const repoName = pushEvent.repo?.name?.replace("SOUVIKSB1/", "") || "MyPortfolioMobile";
            const commitMsg = pushEvent.payload?.commits?.[0]?.message || "feat: continuous portfolio updates";
            setRecentCommit({
              repo: repoName,
              msg: commitMsg.length > 38 ? commitMsg.substring(0, 38) + "..." : commitMsg,
              time: new Date(pushEvent.created_at).toLocaleDateString([], { month: "short", day: "numeric" })
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  // Fetch & increment visitor count on mount
  useEffect(() => {
    const BACKEND = import.meta.env.VITE_API_BASE_URL || "https://myportfoliomobile.onrender.com";
    fetch(`${BACKEND}/api/visits`, { method: "POST" })
      .then((r) => r.json())
      .then((data) => setVisitCount(data.count))
      .catch(() => {
        setVisitCount("—");
      });
  }, []);

  // Fetch total review count on mount
  useEffect(() => {
    const BACKEND = import.meta.env.VITE_API_BASE_URL || "https://myportfoliomobile.onrender.com";
    fetch(`${BACKEND}/api/reviews/count`)
      .then((r) => r.json())
      .then((data) => setReviewCount(data.count))
      .catch(() => setReviewCount("—"));
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
      setSyncStatus("GitHub & Metrics synced");
      
      setTimeout(() => {
        setSyncStatus("Listening for updates...");
      }, 1500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  // Interactive Terminal Command Execution
  const executeTerminalCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let output = "";
    let isAction = false;

    switch (cleanCmd) {
      case "help":
        output = "Available commands: bio, skills, hire_me, matrix, clear";
        break;
      case "bio":
        output = "Souvik Sinhababu | B.Tech CSE @ TMSL • Full-Stack Developer & Cloud DevOps Engineer.";
        break;
      case "skills":
        output = "Core Stack: React, Next.js, Node.js, Express, Docker, Kubernetes, GCP, Python, Java, MongoDB.";
        break;
      case "hire_me":
        output = "🚀 Initiating handshake with Souvik... Redirecting to Ping channel!";
        isAction = true;
        setTimeout(() => onNavigate("contact"), 750);
        break;
      case "matrix":
        output = "⚡ ACCESS GRANTED: 01101111 01110000 01100101 01101110 01100100 01100101 01110110";
        isAction = true;
        if (onTriggerMatrix) {
          setTimeout(() => onTriggerMatrix(), 350);
        }
        break;
      case "clear":
        setTerminalLogs([]);
        return;
      default:
        output = `Command not recognized: '${cleanCmd}'. Try: help, bio, skills, hire_me, matrix`;
        break;
    }

    setTerminalLogs((prev) => [
      ...prev.slice(-3), // keep last 4 outputs for clean mobile space
      { cmd, output, isAction }
    ]);
  };

  const handleCommandChip = (cmd) => {
    executeTerminalCommand(cmd);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customInput) {
      executeTerminalCommand(customInput);
      setCustomInput("");
    }
  };

  return (
    <div className="home-page-container">
      {/* Spacer to push Home content down below sticky header bar */}
      <div className="home-top-spacer" style={{ height: "20px", width: "100%", flexShrink: 0 }} />

      {/* Hero Badge Tag */}
      <div className="home-tag">
        <span className="dot" />
        Let's Build Something Great
      </div>

      {/* Profile/Terminal Header Card with 3D Tilt and custom border glow */}
      <TiltCard className="hero-profile-card glow-border-card">
        <div className="profile-top">
          <div 
            className="avatar-wrapper border-orange-glow"
            onClick={handleAvatarDoubleTap}
            title="Double-tap for Matrix Mode"
          >
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

        {/* Interactive Terminal panel */}
        <div className="console-panel">
          <div className="console-header">
            <div className="console-controls">
              <span className="c-dot red" />
              <span className="c-dot yellow" />
              <span className="c-dot green" />
            </div>
            <span className="console-title">status.sh • interactive</span>
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

            {/* Custom Terminal Command Logs */}
            {terminalLogs.map((log, index) => (
              <div key={index} className="terminal-executed-block">
                <div className="console-line">
                  <span className="c-prompt">souvik@dev:~$</span> <span className="c-text">{log.cmd}</span>
                </div>
                <div className={`terminal-log-output ${log.isAction ? "action-glow" : ""}`}>
                  {log.output}
                </div>
              </div>
            ))}

            <div className="console-typing">
              <span className="c-prompt">souvik@dev:~$</span> <span className="c-type-text">{typingText}</span><span className="c-cursor">_</span>
            </div>
          </div>

          {/* Quick Command Chips */}
          <div 
            className="terminal-chips-row"
            onPointerDownCapture={(e) => e.stopPropagation()}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchMoveCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          >
            <span className="chips-label">Run:</span>
            <button type="button" onClick={() => handleCommandChip("skills")} className="terminal-chip">skills</button>
            <button type="button" onClick={() => handleCommandChip("hire_me")} className="terminal-chip highlight">hire_me</button>
            <button type="button" onClick={() => handleCommandChip("matrix")} className="terminal-chip">matrix</button>
            <button type="button" onClick={() => handleCommandChip("bio")} className="terminal-chip">bio</button>
            {terminalLogs.length > 0 && (
              <button type="button" onClick={() => handleCommandChip("clear")} className="terminal-chip clear">clear</button>
            )}
          </div>
        </div>
      </TiltCard>

      {/* Quick Stats Grid */}
      <div className="home-stats-grid">
        <div className="stat-item glass-panel border-orange-glow">
          <h3 className="stat-number"><CounterTicker value={PROJECTS.length} />+</h3>
          <p className="stat-label">Projects</p>
        </div>
        <div className="stat-item glass-panel">
          <h3 className="stat-number">{dynamicBtechYear}</h3>
          <p className="stat-label">Year B.Tech</p>
        </div>
        <div className="stat-item glass-panel border-blue-glow">
          <h3 className="stat-number"><CounterTicker value={CERTIFICATIONS.length} />+</h3>
          <p className="stat-label">Certificates</p>
        </div>
      </div>

      {/* Live Social & GitHub Sync Hub */}
      <div className="live-hub-card glass-panel border-blue-glow">
        <div className="live-header">
          <div className="live-indicator">
            <span className="live-dot" />
            <span>Connect & Live Hub</span>
          </div>
          <span className="live-status">{syncStatus}</span>
        </div>

        <div className="live-metrics-grid">
          {/* GitHub Repos Live */}
          <a 
            href="https://github.com/SOUVIKSB1" 
            target="_blank" 
            rel="noreferrer" 
            className="live-metric-box github"
          >
            <div className="metric-icon">
              <FaGithub size={18} />
            </div>
            <div className="metric-info">
              <span className="metric-label">GitHub Repos</span>
              <h4 className="metric-value">{githubRepos}+</h4>
            </div>
            <div className="pulse-glow blue" />
          </a>

          {/* LinkedIn Live */}
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
              <span className="metric-label">LinkedIn Network</span>
              <h4 className="metric-value">{linkedinCount}</h4>
            </div>
            <div className="pulse-glow orange" />
          </a>

          {/* Instagram Live */}
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
              <span className="metric-label">Instagram Fans</span>
              <h4 className="metric-value">{instagramCount}</h4>
            </div>
            <div className="pulse-glow pink" />
          </a>

          {/* Portfolio Visits */}
          <div className="live-metric-box visits">
            <div className="metric-icon">
              <FaEye size={18} />
            </div>
            <div className="metric-info">
              <span className="metric-label">Portfolio Visits</span>
              <h4 className="metric-value">
                {visitCount === null ? "…" : typeof visitCount === "number" ? visitCount.toLocaleString() : visitCount}
              </h4>
            </div>
            <div className="pulse-glow green" />
          </div>
        </div>

        {/* Live GitHub Recent Commit Banner */}
        <div className="live-github-commit-bar">
          <div className="commit-bar-icon">
            <FaGithub size={13} />
          </div>
          <div className="commit-bar-text">
            <span className="commit-repo">{recentCommit.repo}:</span>
            <span className="commit-msg">"{recentCommit.msg}"</span>
          </div>
          <span className="commit-time">{recentCommit.time}</span>
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
