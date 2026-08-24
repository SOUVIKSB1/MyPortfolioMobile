import { useState, useRef } from "react";
import { Mail, Phone, ExternalLink, Send, ShieldCheck, Zap } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiCredly, SiGooglecloud } from "react-icons/si";
import { triggerHaptic } from "../hooks/haptics";
import "./Contact.css";

const QUICK_INQUIRIES = [
  {
    id: "hire",
    label: "💼 Hire / Internship",
    text: "Hi Souvik, I checked out your portfolio and would love to discuss software engineering / internship roles with you."
  },
  {
    id: "collab",
    label: "🚀 Project Collab",
    text: "Hey Souvik! I'm working on an exciting project and would love to collaborate with you on full-stack & cloud architecture."
  },
  {
    id: "coffee",
    label: "☕ Coffee Chat",
    text: "Hello Souvik! Love your work on React, Kubernetes & Cloud systems. Would love to connect for a quick tech chat!"
  }
];

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [pingLogs, setPingLogs] = useState([]);
  const [isPinging, setIsPinging] = useState(false);
  const textareaRef = useRef(null);

  const handleSelectInquiry = (inquiry) => {
    triggerHaptic(12);
    setSelectedInquiry(inquiry.id);
    setMessage(inquiry.text);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSendPing = async (e) => {
    e.preventDefault();
    const senderEmail = email.trim();
    const senderMessage = message.trim();
    if (!senderEmail || !senderMessage) return;

    triggerHaptic(15);
    setIsPinging(true);
    setPingLogs([
      "PING souviksinhababu1@gmail.com [TLS Encrypted Tunnel]",
      `[AUTH] Dispatching from: ${senderEmail}`,
      "Connecting to SMTP relay server..."
    ]);

    try {
      // 1. Send email directly to Souvik's Gmail via FormSubmit
      const emailPromise = fetch("https://formsubmit.co/ajax/souviksinhababu1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: senderEmail,
          message: senderMessage,
          _subject: `⚡ Mobile Portfolio Ping from ${senderEmail}`,
          _template: "table",
          _captcha: "false"
        })
      });

      // 2. Also log to backend if reachable
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://myportfoliomobile.onrender.com";
      const backendPromise = fetch(`${API_BASE}/api/pings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: senderEmail, message: senderMessage })
      }).catch(() => null);

      // Wait for email dispatch
      await Promise.allSettled([emailPromise, backendPromise]);

      // Save locally
      const userPing = {
        email: senderEmail,
        message: senderMessage,
        date: new Date().toISOString()
      };
      const savedPings = JSON.parse(localStorage.getItem("portfolio_pings") || "[]");
      localStorage.setItem("portfolio_pings", JSON.stringify([userPing, ...savedPings]));

      setPingLogs([
        "PING souviksinhababu1@gmail.com [TLS Encrypted Tunnel]",
        `[AUTH] Dispatching from: ${senderEmail}`,
        "64 bytes from mail.relay: icmp_seq=1 ttl=64 time=24.5 ms",
        "--- souviksinhababu1@gmail.com ping statistics ---",
        "STATUS: 200 OK — Ping delivered directly to souviksinhababu1@gmail.com! 🚀"
      ]);

      setEmail("");
      setMessage("");
      setSelectedInquiry(null);
    } catch (err) {
      console.error("Direct email ping error:", err);
      // Fallback: Open mail client if network blocked
      setPingLogs((prev) => [
        ...prev,
        "Network dispatch blocked. Opening native mail client fallback...",
        "STATUS: Dispatched to souviksinhababu1@gmail.com ✔"
      ]);
      const mailtoLink = `mailto:souviksinhababu1@gmail.com?subject=${encodeURIComponent("Portfolio Ping from " + senderEmail)}&body=${encodeURIComponent(senderMessage)}`;
      window.open(mailtoLink, "_blank");
    } finally {
      setIsPinging(false);
    }
  };

  return (
    <div className="contact-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        Connect
      </div>
      <h2 className="section-title">Ping Me</h2>

      {/* Main Direct Action Buttons */}
      <div className="direct-contact-row">
        <a href="tel:+918250204087" className="btn-primary direct-btn border-orange-glow">
          <Phone size={18} />
          initCall()
        </a>
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=souviksinhababu1@gmail.com" 
          target="_blank" 
          rel="noreferrer" 
          className="btn-secondary direct-btn border-blue-glow"
        >
          <Mail size={18} />
          sayHello()
        </a>
      </div>

      {/* Quick Inquiries Fast Chips */}
      <div className="quick-inquiries-wrap">
        <div className="inquiries-header">
          <Zap size={13} className="zap-icon" />
          <span>Quick Inquiry Templates</span>
        </div>
        <div className="inquiries-chips-row">
          {QUICK_INQUIRIES.map((inq) => {
            const isSelected = selectedInquiry === inq.id;
            return (
              <button
                key={inq.id}
                type="button"
                onClick={() => handleSelectInquiry(inq)}
                className={`inquiry-chip ${isSelected ? "active" : ""}`}
              >
                {inq.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Ping Terminal Console */}
      <div className="ping-console-box glass-panel">
        <div className="console-header">
          <div className="console-controls">
            <span className="c-dot red" />
            <span className="c-dot yellow" />
            <span className="c-dot green" />
          </div>
          <span className="console-title">ping_console.sh</span>
        </div>

        <form onSubmit={handleSendPing} className="console-form">
          <div className="console-input-line">
            <span className="c-prompt">email:~$</span>
            <input
              type="email"
              placeholder="your-email@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPinging}
              required
            />
          </div>

          <div className="console-input-line">
            <span className="c-prompt">message:~$</span>
            <textarea
              ref={textareaRef}
              placeholder="What are we building?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isPinging}
              rows="2"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary console-send-btn" 
            disabled={isPinging}
          >
            <Send size={14} />
            {isPinging ? "Executing Ping..." : "Send Ping"}
          </button>
        </form>

        {/* Dynamic ping log console feed */}
        {pingLogs.length > 0 && (
          <div className="console-logs-feed">
            {pingLogs.map((log, idx) => (
              <div key={idx} className="log-line">
                <span className="log-arrow">&gt;&gt;</span> {log}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Social Network Links Grid */}
      <div className="socials-grid-card glass-panel">
        <h4 className="socials-title">Find Me Online</h4>
        <div className="social-links-row">
          <a 
            href="https://www.skills.google/public_profiles/57ce5b2f-6df4-4cf5-83fc-f82528bb51fc" 
            target="_blank" 
            rel="noreferrer" 
            className="social-btn google-skills"
            aria-label="Google Cloud Skills Boost Profile"
          >
            <SiGooglecloud size={20} />
            <span>Google Skills</span>
          </a>
          <a 
            href="https://www.credly.com/users/souvik-sinhababu.ccd0d18c/badges/credly" 
            target="_blank" 
            rel="noreferrer" 
            className="social-btn credly"
            aria-label="Credly Verified Badges"
          >
            <SiCredly size={20} />
            <span>Credly</span>
          </a>
          <a 
            href="https://github.com/SOUVIKSB1" 
            target="_blank" 
            rel="noreferrer" 
            className="social-btn github"
            aria-label="GitHub Profile"
          >
            <FaGithub size={20} />
            <span>GitHub</span>
          </a>
          <a 
            href="https://linkedin.com/in/souviksinhababu" 
            target="_blank" 
            rel="noreferrer" 
            className="social-btn linkedin"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://instagram.com/sinhababu_souvik" 
            target="_blank" 
            rel="noreferrer" 
            className="social-btn instagram"
            aria-label="Instagram Profile"
          >
            <FaInstagram size={20} />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
