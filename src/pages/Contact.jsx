import { useState } from "react";
import { Mail, Phone, ExternalLink, Send, ShieldCheck } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Contact.css";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pingLogs, setPingLogs] = useState([]);
  const [isPinging, setIsPinging] = useState(false);

  const handleSendPing = (e) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setIsPinging(true);
    setPingLogs([
      "PING souviksinhababu.dev (127.0.0.1) 56(84) bytes of data.",
      "Initializing connection tunnel..."
    ]);

    // Simulate console ping response ticks
    setTimeout(() => {
      setPingLogs((prev) => [
        ...prev,
        "64 bytes from souvik.dev: icmp_seq=1 ttl=64 time=24.5 ms"
      ]);
    }, 600);

    setTimeout(() => {
      setPingLogs((prev) => [
        ...prev,
        "64 bytes from souvik.dev: icmp_seq=2 ttl=64 time=24.1 ms"
      ]);
    }, 1200);

    setTimeout(() => {
      // Complete ping transmission
      const userPing = {
        email: email.trim(),
        message: message.trim(),
        date: new Date().toISOString()
      };
      
      // Save locally
      const savedPings = JSON.parse(localStorage.getItem("portfolio_pings") || "[]");
      localStorage.setItem("portfolio_pings", JSON.stringify([userPing, ...savedPings]));

      setPingLogs((prev) => [
        ...prev,
        "--- souvik.dev ping statistics ---",
        "2 packets transmitted, 2 received, 0% packet loss, time 1202ms",
        "rtt min/avg/max = 24.1/24.3/24.5 ms",
        "STATUS: message transmitted successfully! ✔"
      ]);
      
      // Reset inputs
      setEmail("");
      setMessage("");
      setIsPinging(false);
    }, 1800);
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
