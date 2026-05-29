import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, BrainCircuit, Cloud, Layers } from "lucide-react";
import TiltCard from "../components/TiltCard";
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

  const togglePrinciple = (idx) => {
    setExpandedPrinciple(expandedPrinciple === idx ? null : idx);
  };

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
                    whileTap={{ scale: 0.94 }}
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
    </div>
  );
}
