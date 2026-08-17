import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Terminal, Zap, ShieldAlert, Award, Play, RotateCcw, Cpu } from "lucide-react";
import { triggerHaptic } from "../hooks/haptics";
import "./MatrixRain.css";

const TECH_NODES = [
  { label: "AI-900", category: "AI", score: 150, color: "#10b981" },
  { label: "AGENTIC AI", category: "AI", score: 200, color: "#a855f7" },
  { label: "RAG ENGINE", category: "AI", score: 180, color: "#00f0ff" },
  { label: "KUBERNETES", category: "Cloud", score: 140, color: "#38bdf8" },
  { label: "DOCKER", category: "Cloud", score: 120, color: "#38bdf8" },
  { label: "REACT 19", category: "Frontend", score: 110, color: "#ff5f00" },
  { label: "PYTHON", category: "Lang", score: 100, color: "#facc15" },
  { label: "IIT ROORKEE", category: "Research", score: 250, color: "#f43f5e" },
  { label: "CLINIC OS", category: "Project", score: 175, color: "#10b981" },
  { label: "SWARNIKA", category: "Project", score: 165, color: "#fb923c" },
  { label: "PAYU₹UPEE", category: "Project", score: 160, color: "#4ade80" },
  { label: "VERTEX AI", category: "AI", score: 190, color: "#ec4899" }
];

const COLOR_THEMES = [
  { id: "emerald", name: "Matrix", primary: "#10b981", bgGlow: "rgba(16, 185, 129, 0.15)" },
  { id: "cyan", name: "Cyber", primary: "#00f0ff", bgGlow: "rgba(0, 240, 255, 0.15)" },
  { id: "orange", name: "Solar", primary: "#ff5f00", bgGlow: "rgba(255, 95, 0, 0.15)" },
  { id: "purple", name: "Neural", primary: "#a855f7", bgGlow: "rgba(168, 85, 247, 0.15)" }
];

export default function MatrixRain({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  
  // Game & Interactive State
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [decryptedCount, setDecryptedCount] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [logs, setLogs] = useState([
    "NEURAL PROTOCOL ENGAGED // SOUVIK_CORE v2.6",
    "TAP FALLING NODES TO DECRYPT PORTFOLIO STACK"
  ]);
  const [unlockedSecret, setUnlockedSecret] = useState(false);

  const activeTheme = COLOR_THEMES[themeIdx];
  const activeThemeRef = useRef(activeTheme);
  const comboTimeoutRef = useRef(null);

  useEffect(() => {
    activeThemeRef.current = activeTheme;
  }, [activeTheme]);

  // Rank determination
  const rank = score >= 1500 
    ? "NEURAL OVERLORD" 
    : score >= 900 
    ? "QUANTUM ARCHITECT" 
    : score >= 400 
    ? "CYBER SPECIALIST" 
    : "NODE INITIATE";

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "010101XYZABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ9876543210#$&%*+=-~<>λπΩ⚡🧠";
    const charArr = chars.split("");
    const fontSize = 14;
    const cols = Math.floor(width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -50));

    // Dynamic Falling Tech Nodes for the game
    let fallingNodes = [];
    let sparks = [];
    let shockwaves = [];

    const spawnNode = () => {
      if (fallingNodes.length < 5 && Math.random() < 0.04) {
        const randomTech = TECH_NODES[Math.floor(Math.random() * TECH_NODES.length)];
        fallingNodes.push({
          ...randomTech,
          id: Math.random(),
          x: Math.random() * (width - 120) + 60,
          y: -30,
          speed: Math.random() * 1.8 + 1.2,
          radius: 26,
          pulse: 0
        });
      }
    };

    const render = () => {
      // Background fade for phosphor glow trail
      ctx.fillStyle = "rgba(4, 6, 10, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Matrix Rain Columns
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      const currentPrimary = activeThemeRef.current.primary;

      for (let i = 0; i < drops.length; i++) {
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head glyph is blazing white
        ctx.fillStyle = "#ffffff";
        ctx.fillText(char, x, y);

        // Body glyph has active neon theme color
        ctx.fillStyle = currentPrimary;
        ctx.shadowColor = currentPrimary;
        ctx.shadowBlur = 6;
        ctx.fillText(char, x, y - fontSize);
        ctx.shadowBlur = 0;

        if (y > height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // 2. Spawn and Draw Interactive Falling Tech Nodes
      spawnNode();

      fallingNodes.forEach((node) => {
        node.y += node.speed;
        node.pulse += 0.05;

        const pulseScale = 1 + Math.sin(node.pulse) * 0.08;

        // Node Glow Ring
        ctx.save();
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 14;
        ctx.strokeStyle = node.color;
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgba(10, 14, 24, 0.85)";

        ctx.beginPath();
        ctx.roundRect(
          node.x - 45 * pulseScale,
          node.y - 14 * pulseScale,
          90 * pulseScale,
          28 * pulseScale,
          8
        );
        ctx.fill();
        ctx.stroke();

        // Node Label
        ctx.font = "bold 10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label, node.x, node.y);
        ctx.restore();
      });

      // Remove nodes past bottom screen
      fallingNodes = fallingNodes.filter((n) => n.y < height + 40);

      // 3. Draw Shockwaves from taps
      shockwaves = shockwaves.filter((sw) => sw.radius < sw.maxRadius);
      shockwaves.forEach((sw) => {
        sw.radius += 5;
        const alpha = 1 - sw.radius / sw.maxRadius;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${sw.color}${Math.floor(alpha * 255).toString(16).padStart(2, "0")}`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
      });

      // 4. Draw Particle Sparks
      sparks = sparks.filter((s) => s.alpha > 0.02);
      sparks.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.alpha -= 0.025;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    // Tap to intercept & Decrypt Falling Nodes
    const handleCanvasPointerDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (!clientX || !clientY) return;

      const touchX = clientX - rect.left;
      const touchY = clientY - rect.top;

      // Add shockwave ring
      shockwaves.push({
        x: touchX,
        y: touchY,
        radius: 5,
        maxRadius: 75,
        color: activeThemeRef.current.primary
      });

      // Check if a falling tech node was tapped
      let hitNode = null;
      fallingNodes = fallingNodes.filter((node) => {
        const dx = Math.abs(node.x - touchX);
        const dy = Math.abs(node.y - touchY);
        if (dx < 55 && dy < 25 && !hitNode) {
          hitNode = node;
          return false; // remove popped node
        }
        return true;
      });

      if (hitNode) {
        // Hit!
        triggerHaptic(20);

        // Spawn explosion sparks
        for (let i = 0; i < 18; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 5 + 2;
          sparks.push({
            x: hitNode.x,
            y: hitNode.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3 + 1,
            color: hitNode.color,
            alpha: 1
          });
        }

        // Score update with combo
        setCombo((prev) => {
          const newCombo = prev + 1;
          if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
          comboTimeoutRef.current = setTimeout(() => setCombo(1), 2200);
          return newCombo;
        });

        const pointsEarned = hitNode.score * combo;
        setScore((prev) => {
          const next = prev + pointsEarned;
          if (next >= 1000 && !unlockedSecret) {
            setUnlockedSecret(true);
            triggerHaptic(30);
          }
          return next;
        });

        setDecryptedCount((prev) => prev + 1);

        setLogs((prev) => [
          ...prev.slice(-3),
          `[DECRYPTED] ${hitNode.label} (+${pointsEarned} PTS)`
        ]);
      } else {
        // Ambient tap spark
        triggerHaptic(8);
        for (let i = 0; i < 6; i++) {
          sparks.push({
            x: touchX,
            y: touchY,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: Math.random() * 2 + 1,
            color: activeThemeRef.current.primary,
            alpha: 0.8
          });
        }
      }
    };

    canvas.addEventListener("pointerdown", handleCanvasPointerDown);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("pointerdown", handleCanvasPointerDown);
      window.removeEventListener("resize", handleResize);
      if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    };
  }, [isOpen, combo, unlockedSecret]);

  const handleResetGame = () => {
    triggerHaptic(15);
    setScore(0);
    setCombo(1);
    setDecryptedCount(0);
    setUnlockedSecret(false);
    setLogs(["GAME RESET // RE-CALIBRATING QUANTUM MATRIX"]);
  };

  const handleCycleTheme = () => {
    triggerHaptic(12);
    setThemeIdx((prev) => (prev + 1) % COLOR_THEMES.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="matrix-rain-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <canvas ref={canvasRef} className="matrix-canvas" />

          {/* Futuristic HUD Header */}
          <div className="matrix-hud-header">
            <div className="matrix-header-left">
              <div 
                className="matrix-hud-badge"
                style={{
                  color: activeTheme.primary,
                  borderColor: `${activeTheme.primary}44`,
                  background: activeTheme.bgGlow
                }}
              >
                <Cpu size={14} className="matrix-pulse-icon" />
                <span>SOUVIK // QUANTUM CORE</span>
              </div>
              <span className="matrix-rank-pill">{rank}</span>
            </div>

            <div className="matrix-header-right">
              <button
                onClick={handleCycleTheme}
                className="matrix-hud-btn"
                aria-label="Cycle Matrix Theme"
                title="Cycle Color Theme"
              >
                <Zap size={14} style={{ color: activeTheme.primary }} />
                <span>{activeTheme.name}</span>
              </button>

              <button
                onClick={() => {
                  triggerHaptic(10);
                  onClose();
                }}
                className="matrix-close-btn"
                aria-label="Exit Matrix"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Real-time Cyber HUD Scoreboard */}
          <div className="matrix-hud-scoreboard">
            <div className="hud-metric">
              <span className="hud-metric-lbl">DECRYPTED SCORE</span>
              <span className="hud-metric-val" style={{ color: activeTheme.primary }}>
                {score.toLocaleString()}
              </span>
            </div>

            <div className="hud-metric">
              <span className="hud-metric-lbl">NODES</span>
              <span className="hud-metric-val">{decryptedCount}</span>
            </div>

            {combo > 1 && (
              <motion.div 
                className="hud-combo-badge"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ borderColor: activeTheme.primary, color: activeTheme.primary }}
              >
                🔥 {combo}x COMBO!
              </motion.div>
            )}
          </div>

          {/* Secret Protocol Banner */}
          {unlockedSecret && (
            <motion.div 
              className="matrix-secret-banner"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Award size={16} className="secret-icon" />
              <span>CLASSIFIED PROTOCOL UNLOCKED: Souvik's Neural Core 100% Synced!</span>
            </motion.div>
          )}

          {/* Interactive Terminal Stream Logs */}
          <div className="matrix-bottom-deck">
            <div className="matrix-terminal-console">
              <div className="matrix-console-header">
                <Terminal size={12} style={{ color: activeTheme.primary }} />
                <span>LIVE QUANTUM INTERCEPTOR</span>
                <button onClick={handleResetGame} className="matrix-reset-btn" title="Reset Game">
                  <RotateCcw size={11} /> Reset
                </button>
              </div>
              <div className="matrix-console-logs">
                {logs.map((log, idx) => (
                  <div key={idx} className="matrix-log-line">
                    <span className="log-prompt">&gt;</span> {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="matrix-touch-instruction">
              <Sparkles size={13} style={{ color: activeTheme.primary }} />
              <span>Tap falling tech nodes to decrypt & score points!</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
