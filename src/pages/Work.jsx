import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import BottomSheet from "../components/BottomSheet";
import "./Work.css";

const PROJECTS = [
  {
    icon: "🏥",
    title: "Clinic OS",
    tagline: "Comprehensive clinic billing & management system.",
    description: "An enterprise-grade clinic management suite featuring calendar bookings, electronic patient medical records (EMR), automated prescriptions, and a secure real-time billing dashboard with financial analytical widgets.",
    tech: ["React", "Node.js", "Express", "ORACLE SQL PLUS", "Tailwind CSS"],
    github: "https://github.com/SOUVIKSB1/CLINIC_OS",
    live: "https://clinic-os-gamma-one.vercel.app/",
    role: "Full-Stack Web Application",
    outcomes: "Streamlines patient check-in times by 40% and aggregates monthly revenue analytics instantly."
  },
  {
    icon: "🛍️",
    title: "Swarnika",
    tagline: "Luxury-inspired e-commerce platform with secure digital commerce infrastructure.",
    description: "Designed and developed a full-stack e-commerce platform focused on premium retail experiences. The application integrates secure Firebase authentication, dynamic product management, real-time inventory handling, and intuitive shopping workflows. Built with a responsive user interface and scalable backend architecture to ensure smooth performance, secure transactions, and an engaging customer journey across all devices.",
    tech: ["HTML", "CSS", "JavaScript", "MongoDB", "Firebase Authentication"],
    github: "https://github.com/SOUVIKSB1/Swarnika",
    live: "https://swarnika-lemon.vercel.app/login"
    role: "Full-Stack Web Application",
    outcomes: "Implemented secure Google Sign-In, automated product management workflows, responsive shopping experiences, and scalable database operations supporting efficient retail transactions and customer engagement."
  },
  {
    icon: "💰",
    title: "PiggyBank Tracker",
    tagline: "Interactive online personal finance expense manager.",
    description: "A client-side interactive transaction manager that records expenses, categorizes budgets, and builds responsive charts showing monthly spending trends with automated storage hydration.",
    tech: ["JavaScript", "HTML5", "CSS3", "Local Storage", "ChartJS"],
    github: "https://github.com/SOUVIKSB1/PiggyBank",
    live: "https://souviksb1.github.io/PiggyBank",
    role: "Frontend Engineer",
    outcomes: "Provides offline access and updates state dynamically using simple event listeners."
  },
  {
    icon: "🧩",
    title: "AI 8-Puzzle Solver",
    tagline: "Algorithmic solver implementing search heuristics.",
    description: "An artificial intelligence search model that simulates the 8-puzzle game. It calculates states and solves boards using A* Search heuristics, including Manhattan distance and misplaced tiles calculations.",
    tech: ["Python", "AI Search Heuristics", "State-Space Graphs", "Tkinter"],
    github: "https://github.com/SOUVIKSB1/8_Puzzle",
    live: "https://eight-puzzle-1swc.onrender.com/",
    role: "Algorithm Developer",
    outcomes: "Solves solvable configurations within milliseconds and details open/closed search nodes."
  },
  {
    icon: "⚙️",
    title: "Computer Architecture Design",
    tagline: "VHDL models for core processor components.",
    description: "Hardware description language simulation files modeling registers, Arithmetic Logic Units (ALUs), instruction memory maps, and simulation testbenches for structural analysis (PCC-CS-492).",
    tech: ["VHDL", "CPU Logic", "ModelSim", "Xilinx ISE"],
    github: "https://github.com/SOUVIKSB1/PCC-CS-492-ARCHITECTURE-",
    live: "https://github.com/SOUVIKSB1/PCC-CS-492-ARCHITECTURE-",
    role: "Hardware Modeler",
    outcomes: "Simulates complete 8-bit instruction parsing loops inside a digital lab environment."
  },
  {
    icon: "🖥️",
    title: "CBT-CIP Interface",
    tagline: "Learning interface with structural verification.",
    description: "A computer-based validation checking client panel styled with high contrast grids, focusing on smooth keyboard flow, accessibility compliance, and strict form evaluation rules.",
    tech: ["JavaScript", "HTML5", "CSS3", "Validation Protocols"],
    github: "https://github.com/SOUVIKSB1/CBT-CIP",
    live: "https://souviksb1.github.io/CBT-CIP",
    role: "UI Engineer",
    outcomes: "Maintains screen readers compatibility and prevents browser focus leaks."
  },
  {
    icon: "🧮",
    title: "Calculator Web Suite",
    tagline: "Modern responsive scientific calculator app.",
    description: "A visual calculator application with standard/scientific operation layouts, supporting dark black glowing UI skins and persistent operations history cache.",
    tech: ["JavaScript", "HTML5", "CSS3", "Glassmorphic Theme"],
    github: "https://github.com/SOUVIKSB1/Calculator-V-3.0",
    live: "https://souviksb1.github.io/Calculator-V-3.0",
    role: "Frontend Designer",
    outcomes: "Features smooth CSS transition layers and precise arithmetic state calculations."
  }
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectDetails = (proj) => {
    setSelectedProject(proj);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="work-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        My Work
      </div>
      <h2 className="section-title">Featured Projects</h2>

      {/* Projects List */}
      <div className="projects-feed">
        {PROJECTS.map((proj, idx) => (
          <div 
            key={idx} 
            className="project-card glass-panel"
            onClick={() => openProjectDetails(proj)}
          >
            <div className="proj-card-header">
              <span className="proj-card-icon">{proj.icon}</span>
              <div className="proj-card-meta">
                <h3 className="proj-card-title">{proj.title}</h3>
                <span className="proj-card-role">{proj.role}</span>
              </div>
            </div>
            <p className="proj-card-tagline">{proj.tagline}</p>
            <div className="proj-card-tech-preview">
              {proj.tech.slice(0, 3).map((t) => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
              {proj.tech.length > 3 && (
                <span className="tech-pill more">+{proj.tech.length - 3}</span>
              )}
            </div>
            
            {/* Quick Action links */}
            <div className="proj-card-links" onClick={(e) => e.stopPropagation()}>
              <a 
                href={proj.github} 
                target="_blank" 
                rel="noreferrer" 
                className="proj-link-icon-btn"
                aria-label={`View GitHub source code for ${proj.title}`}
              >
                <FaGithub size={12} />
                Code
              </a>
              {proj.live && (
                <a 
                  href={proj.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="proj-link-icon-btn"
                  aria-label={`Visit live demo for ${proj.title}`}
                >
                  <ExternalLink size={12} />
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Sheet Drawer for Selected Project */}
      <BottomSheet
        isOpen={selectedProject !== null}
        onClose={closeProjectDetails}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="project-drawer-layout">
            <div className="drawer-header-meta">
              <span className="drawer-proj-icon">{selectedProject.icon}</span>
              <div>
                <h4 className="drawer-role-label">{selectedProject.role}</h4>
                <p className="drawer-tech-text">{selectedProject.tech.join(" · ")}</p>
              </div>
            </div>

            <div className="drawer-body-text">
              <h5 className="drawer-sub-title">Overview</h5>
              <p>{selectedProject.description}</p>
            </div>

            <div className="drawer-body-text">
              <h5 className="drawer-sub-title">Key Outcome</h5>
              <p className="drawer-highlight-text">
                <Sparkles size={14} className="spark-inline" />
                {selectedProject.outcomes}
              </p>
            </div>

            <div className="drawer-actions">
              <a 
                href={selectedProject.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-secondary drawer-link-btn"
              >
                <FaGithub size={16} />
                GitHub Code
              </a>
              {selectedProject.live && (
                <a 
                  href={selectedProject.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary drawer-link-btn"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
