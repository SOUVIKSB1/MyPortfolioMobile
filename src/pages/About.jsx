import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  BrainCircuit, 
  Cloud, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Award
} from "lucide-react";
import { SiCredly, SiGooglecloud } from "react-icons/si";
import TiltCard from "../components/TiltCard";
import BottomSheet from "../components/BottomSheet";
import { triggerHaptic } from "../hooks/haptics";
import "./About.css";

const PRINCIPLES = [
  {
    num: "01",
    icon: <Layers size={18} />,
    title: "Performance-First Architecture",
    description: "Focusing on code efficiency, minimal bundle weights, and aggressive loading optimization to guarantee fluid, responsive mobile interfaces and stellar Core Web Vitals."
  },
  {
    num: "02",
    icon: <Cloud size={18} />,
    title: "Cloud-Native Deployments",
    description: "Architecting containerized microservices with Docker, writing secure configuration manifests, and orchestrating automated pipelines targeting Google Kubernetes Engine."
  },
  {
    num: "03",
    icon: <BrainCircuit size={18} />,
    title: "Clean Code & Visual Consistency",
    description: "Fusing precise styling tokens, accessible Semantic HTML layouts, and robust type safety to build clean, maintainable codebases that are scalable and resilient."
  }
];

const DOMAINS = [
  {
    id: "fullstack",
    tabLabel: "Full-Stack",
    name: "Full-Stack & Frontend",
    score: 95,
    level: "High-Fidelity Master",
    color: "#ff5f00",
    glow: "rgba(255, 95, 0, 0.6)",
    summary: "React, Next.js, Node.js, Express & responsive mobile design architecture."
  },
  {
    id: "cloud",
    tabLabel: "Cloud",
    name: "Cloud, DevOps & K8s",
    score: 92,
    level: "Production Orchestrator",
    color: "#00d2ff",
    glow: "rgba(0, 210, 255, 0.6)",
    summary: "GCP, Docker containerization, Kubernetes GKE & automated CI/CD pipelines."
  },
  {
    id: "systems",
    tabLabel: "Core CS",
    name: "CS Core & Databases",
    score: 88,
    level: "Engineering Specialist",
    color: "#10b981",
    glow: "rgba(16, 185, 129, 0.6)",
    summary: "Java, Python, C++, Data Structures, PostgreSQL & MongoDB database modeling."
  },
  {
    id: "ai",
    tabLabel: "AI & GenAI",
    name: "Agentic AI & GenAI",
    score: 85,
    level: "Active Builder",
    color: "#a855f7",
    glow: "rgba(168, 85, 247, 0.6)",
    summary: "Vertex AI, Prompt Engineering, Agentic Workflows & Generative AI models."
  }
];

const SKILL_CATEGORIES = {
  languages: {
    title: "Languages",
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C++", "HTML5", "CSS3"]
  },
  frameworks: {
    title: "Frameworks & DB",
    skills: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "Next.js", "VHDL"]
  },
  cloud: {
    title: "Cloud, DevOps & AI",
    skills: ["GCP", "Azure", "Docker", "Kubernetes", "Vertex AI", "Generative AI", "CI/CD Pipelines", "Git"]
  }
};

export default function About() {
  const [expandedPrinciple, setExpandedPrinciple] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState("fullstack");
  const [activeSkillTooltip, setActiveSkillTooltip] = useState(null);
  const [selectedAward, setSelectedAward] = useState(null);

  const togglePrinciple = (idx) => {
    triggerHaptic(10);
    setExpandedPrinciple(expandedPrinciple === idx ? null : idx);
  };

  const activeDomainData = DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0];

  return (
    <div className="about-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        Who I Am
      </div>
      <h2 className="section-title">Biography & Core</h2>

      {/* Bio text with 3D Tilt Card and Glowing borders */}
      <TiltCard className="bio-panel glow-border-card">
        <p className="bio-p">
          I am a B.Tech Computer Science Engineering student at Techno Main Salt Lake, Kolkata. 
        </p>
        <p className="bio-p second">
          My passion lies in bridging high-fidelity frontend visual aesthetics with modern, robust cloud environments. I approach engineering with a focus on optimization, containerized scalability, and maintainability.
        </p>
      </TiltCard>

      {/* ── VERIFIED PUBLIC PORTALS & BADGES HUB ── */}
      <div className="about-portals-section">
        <div className="aura-header">
          <div className="aura-title-wrap">
            <Award size={16} className="aura-icon" style={{ color: "#f59e0b" }} />
            <h3 className="sub-header-title" style={{ margin: 0 }}>Public Portals & Badges</h3>
          </div>
          <span className="aura-live-badge" style={{ borderColor: "rgba(245, 158, 11, 0.4)", color: "#f59e0b", background: "rgba(245, 158, 11, 0.1)" }}>
            Verified
          </span>
        </div>

        <div className="public-portals-container">
          {/* Google Cloud Skills Boost Card */}
          <div className="portal-card google-portal glass-panel">
            <div className="portal-card-top">
              <div className="portal-icon google">
                <SiGooglecloud size={20} />
              </div>
              <div className="portal-meta">
                <span className="portal-tag">Google Cloud Skills Boost</span>
                <h4 className="portal-title">Arcade Champion 2025</h4>
              </div>
              <span className="portal-badge diamond">Diamond League</span>
            </div>
            <p className="portal-desc">
              107+ Skill Badges • 400+ practiced labs (423 completed) • 72+ courses across Vertex AI &amp; Kubernetes.
            </p>
            <div 
              className="portal-links-scroll"
              onPointerDownCapture={(e) => e.stopPropagation()}
              onTouchStartCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
              onTouchEndCapture={(e) => e.stopPropagation()}
            >
              <a
                href="https://www.skills.google/public_profiles/57ce5b2f-6df4-4cf5-83fc-f82528bb51fc"
                target="_blank"
                rel="noreferrer"
                className="portal-link-btn primary"
                onClick={() => triggerHaptic(10)}
              >
                <span>Skills Profile 1</span>
                <ExternalLink size={11} />
              </a>
              <a
                href="https://www.skills.google/public_profiles/16ea7d05-4436-4228-b43e-7f2bb2bfb07e"
                target="_blank"
                rel="noreferrer"
                className="portal-link-btn secondary"
                onClick={() => triggerHaptic(10)}
              >
                <span>Skills Profile 2</span>
                <ExternalLink size={11} />
              </a>
              <button
                type="button"
                className="portal-link-btn accent"
                onClick={() => {
                  triggerHaptic(12);
                  setSelectedAward({
                    title: "Google Cloud Arcade Champion 2025",
                    issuer: "Google Cloud Skills Boost",
                    date: "2025",
                    id: "GCP-ARCADE-2025",
                    image: "/certificates/google_cloud_arcade_champion_2025.jpg",
                    stats: "Diamond League • 1,00,000+ Points • 107+ Badges • 400+ Labs"
                  });
                }}
              >
                <span>View Award</span>
                <Sparkles size={11} />
              </button>
            </div>
          </div>

          {/* Credly Verified Credentials Card */}
          <div className="portal-card credly-portal glass-panel">
            <div className="portal-card-top">
              <div className="portal-icon credly">
                <SiCredly size={20} />
              </div>
              <div className="portal-meta">
                <span className="portal-tag">Credly by Pearson</span>
                <h4 className="portal-title">Verified Digital Badges</h4>
              </div>
              <span className="portal-badge verified">Verified Earner</span>
            </div>
            <p className="portal-desc">
              Authenticated enterprise transcripts across Microsoft Azure AI, AWS Academy, and IBM SkillsBuild.
            </p>
            <div 
              className="portal-links-scroll"
              onPointerDownCapture={(e) => e.stopPropagation()}
              onTouchStartCapture={(e) => e.stopPropagation()}
              onTouchMoveCapture={(e) => e.stopPropagation()}
              onTouchEndCapture={(e) => e.stopPropagation()}
            >
              <a
                href="https://www.credly.com/users/souvik-sinhababu.ccd0d18c/badges/credly"
                target="_blank"
                rel="noreferrer"
                className="portal-link-btn primary"
                onClick={() => triggerHaptic(10)}
              >
                <span>Badges Transcript</span>
                <ExternalLink size={11} />
              </a>
              <a
                href="https://www.credly.com/users/souvik-sinhababu"
                target="_blank"
                rel="noreferrer"
                className="portal-link-btn secondary"
                onClick={() => triggerHaptic(10)}
              >
                <span>Credly Profile</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Proficiency Aura Section */}
      <div className="proficiency-aura-section">
        <div className="aura-header">
          <div className="aura-title-wrap">
            <Cpu size={16} className="aura-icon" />
            <h3 className="sub-header-title" style={{ margin: 0 }}>Proficiency Aura</h3>
          </div>
          <span className="aura-live-badge">Live Radar</span>
        </div>

        <div className="aura-card glass-panel border-orange-glow">
          {/* Domain Category Selector Tabs */}
          <div 
            className="aura-domain-tabs"
            onPointerDownCapture={(e) => e.stopPropagation()}
            onTouchStartCapture={(e) => e.stopPropagation()}
            onTouchMoveCapture={(e) => e.stopPropagation()}
            onTouchEndCapture={(e) => e.stopPropagation()}
          >
            {DOMAINS.map((domain) => {
              const isSelected = selectedDomain === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    triggerHaptic(12);
                    setSelectedDomain(domain.id);
                  }}
                  className={`aura-domain-tab ${isSelected ? "active" : ""}`}
                  style={{
                    color: isSelected ? domain.color : undefined,
                    borderColor: isSelected ? domain.color : undefined
                  }}
                >
                  <span className="domain-tab-score">{domain.score}%</span>
                  <span className="domain-tab-name">{domain.tabLabel || domain.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Spotlight Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomainData.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="aura-spotlight"
            >
              <div className="aura-spotlight-top">
                <div className="spotlight-identity">
                  <h4 className="spotlight-domain-name">{activeDomainData.name}</h4>
                  <span 
                    className="spotlight-level-pill"
                    style={{ 
                      color: activeDomainData.color,
                      borderColor: activeDomainData.color,
                      backgroundColor: `${activeDomainData.color}15`
                    }}
                  >
                    <CheckCircle2 size={11} />
                    {activeDomainData.level}
                  </span>
                </div>
                <span 
                  className="spotlight-score-large"
                  style={{ 
                    color: activeDomainData.color,
                    textShadow: `0 0 14px ${activeDomainData.glow}`
                  }}
                >
                  {activeDomainData.score}%
                </span>
              </div>

              {/* Animated Progress Meter */}
              <div className="aura-meter-track">
                <motion.div 
                  className="aura-meter-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${activeDomainData.score}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                  style={{ 
                    background: `linear-gradient(90deg, ${activeDomainData.color}88, ${activeDomainData.color})`,
                    boxShadow: `0 0 12px ${activeDomainData.glow}`
                  }}
                />
              </div>

              <p className="aura-summary-text">{activeDomainData.summary}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Engineering Principles Accordion */}
      <div className="principles-section">
        <h3 className="sub-header-title">Engineering Principles</h3>
        <div className="accordion-wrapper">
          {PRINCIPLES.map((pr, idx) => {
            const isExpanded = expandedPrinciple === idx;
            return (
              <motion.div 
                key={idx} 
                initial={{ x: -25, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: idx * 0.08 }}
                className={`accordion-item glass-panel ${isExpanded ? "active" : ""}`}
                onClick={() => togglePrinciple(idx)}
              >
                <div className="accordion-header">
                  <div className="header-left">
                    <span className="principle-number">{pr.num}</span>
                    <span className="principle-icon">{pr.icon}</span>
                    <h4 className="principle-title">{pr.title}</h4>
                  </div>
                  <motion.div 
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="chevron-icon"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="accordion-content-outer"
                    >
                      <p className="accordion-content-text">{pr.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skills Category Panels */}
      <div className="skills-section">
        <h3 className="sub-header-title">Technical Weapons</h3>
        <div className="skills-vertical-stack">
          {Object.entries(SKILL_CATEGORIES).map(([key, cat], catIdx) => (
            <motion.div 
              key={key} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 14, delay: catIdx * 0.12 }}
              className="skills-category-box glow-border-card border-blue-glow"
            >
              <h4 className="skills-category-title">{cat.title}</h4>
              <div className="skills-tag-cloud">
                {cat.skills.map((skill, idx) => (
                  <motion.div 
                    key={skill} 
                    className="skill-tag border-orange-glow"
                    initial={{ scale: 0.8, y: 10, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 120, 
                      damping: 10, 
                      delay: catIdx * 0.1 + idx * 0.02 + 0.2 
                    }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      triggerHaptic(8);
                      setActiveSkillTooltip(activeSkillTooltip === skill ? null : skill);
                    }}
                  >
                    <span className="skill-dot" />
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Award BottomSheet Modal */}
      <BottomSheet
        isOpen={selectedAward !== null}
        onClose={() => {
          triggerHaptic(8);
          setSelectedAward(null);
        }}
        title="Official Credential Verification"
      >
        {selectedAward && (
          <div className="cert-drawer-layout" style={{ textAlign: "left" }}>
            <div className="cert-drawer-header">
              <span className="cert-drawer-emoji" style={{ fontSize: "28px" }}>🏆</span>
              <div className="cert-drawer-header-meta">
                <h3 className="cert-drawer-title" style={{ fontSize: "16px", margin: "0 0 2px 0", color: "#fff" }}>{selectedAward.title}</h3>
                <h4 className="cert-drawer-issuer" style={{ fontSize: "12px", color: "var(--orange)", margin: 0 }}>{selectedAward.issuer}</h4>
              </div>
            </div>

            <div className="cert-status-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "8px", padding: "6px 10px", margin: "12px 0", fontSize: "11px", color: "#10b981", fontWeight: 600 }}>
              <ShieldCheck size={14} />
              <span>Officially Verified &amp; Authenticated • 2025</span>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "10px 12px", fontSize: "11.5px", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "12px" }}>
              {selectedAward.stats}
            </div>

            <div style={{ textAlign: "center", marginBottom: "14px" }}>
              <img
                src={selectedAward.image}
                alt={selectedAward.title}
                style={{ width: "100%", maxHeight: "260px", objectFit: "contain", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.12)" }}
              />
            </div>

            <div className="cert-drawer-actions">
              <a
                href="https://www.skills.google/public_profiles/57ce5b2f-6df4-4cf5-83fc-f82528bb51fc"
                target="_blank"
                rel="noreferrer"
                className="btn-primary cert-action-main"
                onClick={() => triggerHaptic(12)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", textDecoration: "none", width: "100%", padding: "12px", borderRadius: "12px", background: "linear-gradient(135deg, #ff5f00, #ff8c00)", color: "#fff", fontWeight: 700, fontSize: "13px" }}
              >
                <ExternalLink size={15} />
                <span>Verify on Google Skills Portal</span>
              </a>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
