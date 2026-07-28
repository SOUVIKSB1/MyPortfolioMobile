import { useState } from "react";
import { ExternalLink, Sparkles, Briefcase, FolderOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import BottomSheet from "../components/BottomSheet";
import "./Work.css";

export const PROJECTS = [
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
    live: "https://swarnika-lemon.vercel.app/login",
    role: "Full-Stack Web Application",
    outcomes: "Implemented secure Google Sign-In, automated product management workflows, responsive shopping experiences, and scalable database operations supporting efficient retail transactions and customer engagement."
  },
  {
    icon: "₹",
    title: "PayU₹upee",
    tagline: "Secure digital e-wallet with scheduled payments and splits.",
    description: "A premium full-stack digital e-wallet platform featuring a secure 6-digit UPI PIN authentication layer, real-time transaction streams, automated scheduled payments, multi-person split billing utilities, interactive scratch card cashback rewards, and responsive financial analysis insights.",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/SOUVIKSB1/PayURupee",
    live: "https://pay-u-rupee.vercel.app",
    role: "Full-Stack Web Application",
    outcomes: "Secures digital asset transfers with hashed UPI PIN authorization and automates recurring bill executions via polling schedulers."
  },
  {
    icon: "💰",
    title: "PiggyBank Tracker",
    tagline: "Interactive online personal finance expense manager.",
    description: "A client-side interactive transaction manager that records expenses, categorizes budgets, and builds responsive charts showing monthly spending trends with automated storage hydration.",
    tech: ["JavaScript", "HTML5", "CSS3", "Local Storage", "ChartJS"],
    github: "https://github.com/SOUVIKSB1/PiggyBank",
    live: "https://souviksb1.github.io/PiggyBank",
    role: "Frontend Web Application",
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
    role: "Algorithm Demonstration",
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
  icon: "🫟",
  title: "Calculator Web V3.0",
  tagline: "AI-powered next-generation calculator with smart productivity features.",
  description: "A futuristic calculator web application featuring advanced arithmetic operations, voice-enabled input, intelligent AI assistance, theme customization, unit conversion utilities, interactive sound effects, and a responsive user interface designed for seamless cross-device experiences.",
  tech: ["HTML5", "CSS3", "JavaScript"],
  github: "https://github.com/SOUVIKSB1/Calculator-V-3.0",
  live: "https://calculator-v-3-0.vercel.app/",
  role: "Frontend Development",
  outcomes: "Implemented AI-assisted calculations, voice recognition capabilities, theme switching, and conversion tools while maintaining responsive performance across desktop and mobile devices."
},
{
  icon: "🧮",
  title: "Calculator Web V2.0",
  tagline: "Scientific calculator with enhanced functionality and modern UI design.",
  description: "A feature-rich scientific calculator web application developed with modern frontend technologies, offering advanced mathematical operations, responsive layouts, intuitive user interactions, and a visually appealing dark-themed interface optimized for accuracy and usability.",
  tech: ["HTML5", "CSS3", "JavaScript"],
  github: "https://github.com/SOUVIKSB1/Calculator-V-2.0",
  live: "https://souviksb1.github.io/Calculator-V-2.0/",
  role: "Frontend Development",
  outcomes: "Built advanced scientific calculation capabilities, optimized UI responsiveness, and delivered a clean user experience with improved accessibility and performance."
},
{
  icon: "⛓️‍💥",
  title: "Calculator Web V1.0",
  tagline: "Foundational calculator application focused on accuracy and responsiveness.",
  description: "A responsive calculator web application designed to perform essential arithmetic operations through a clean interface, structured layouts, and reliable client-side logic. Developed as the foundation for future calculator versions with improved features and functionality.",
  tech: ["HTML5", "CSS3", "JavaScript"],
  github: "https://github.com/SOUVIKSB1/Calculator-V-1.0",
  live: "https://souviksb1.github.io/Calculator-V-1.0/",
  role: "Frontend Development",
  outcomes: "Implemented core arithmetic operations, responsive layouts, and user-friendly interactions while establishing the base architecture for subsequent calculator versions."
}
];

export const INTERNSHIPS = [
  {
    icon: "🔬",
    title: "Research Intern",
    company: "IIT Roorkee (IITR)",
    tagline: "Ongoing Research Internship focused on Computer Vision and Deep Learning pipelines.",
    description: "Developing an end-to-end deep learning system for Railway Track Fault Detection. Implementing transfer learning models using EfficientNetV2B0 with TensorFlow/Keras to achieve high-recall safety-critical classifications, served via a Gradio dashboard interface.",
    tech: ["TensorFlow", "Keras", "EfficientNetV2", "Gradio", "Python", "Computer Vision"],
    github: "https://github.com/SOUVIKSB1/Railway_Track_Fault_Detection",
    live: "https://github.com/SOUVIKSB1/Railway_Track_Fault_Detection",
    role: "Research Intern (Deep Learning)",
    outcomes: "Engineered safety-focused models minimizing false negatives with post-training probability calibration and robust confidence gates.",
    duration: "July 2026 - Present (Ongoing)",
    issuers: "IIT Roorkee"
  },
  {
    icon: "☁️",
    title: "Data Engineering Virtual Internship",
    company: "EduSkills (AWS Academy)",
    tagline: "8-week intensive virtual internship in Data Engineering powered by AWS Academy.",
    description: "Completed an intensive 8-week virtual internship focusing on modern data engineering workflows, database architectures, ETL pipeline creation, and cloud analysis on AWS. Gained practical experience implementing data warehousing, serverless querying, and real-time streaming services using the official AWS Academy curriculum.",
    tech: ["AWS Academy", "Data Engineering", "Cloud DBMS", "ETL Pipelines", "AICTE Support"],
    github: null,
    live: "/certificates/data_engineering_virtual_internship.pdf",
    role: "Data Engineering Intern",
    outcomes: "Earned Grade O (Outstanding) with Certificate ID 4597a1ded345be899574. Validated student ID STU65fdd1992c2d11711133081.",
    id: "4597a1ded345be899574",
    studentId: "STU65fdd1992c2d11711133081",
    grade: "O (Outstanding)",
    duration: "June - August 2026 (Completed)",
    issuers: "AICTE & EduSkills"
  }
];

export default function Work() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");

  const openProjectDetails = (proj) => {
    setSelectedProject(proj);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  const currentList = activeTab === "projects" ? PROJECTS : INTERNSHIPS;

  return (
    <div className="work-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        My Work
      </div>
      <h2 className="section-title">Featured Projects</h2>

      {/* Segment Selector tabs */}
      <div className="work-tab-bar glass-panel">
        <button
          onClick={() => setActiveTab("projects")}
          className={`work-segment-btn ${activeTab === "projects" ? "active" : ""}`}
        >
          <FolderOpen size={16} />
          Projects
          {activeTab === "projects" && (
            <motion.div 
              className="active-work-segment-line"
              layoutId="workTabLine"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("internships")}
          className={`work-segment-btn ${activeTab === "internships" ? "active" : ""}`}
        >
          <Briefcase size={16} />
          Internships
          {activeTab === "internships" && (
            <motion.div 
              className="active-work-segment-line"
              layoutId="workTabLine"
            />
          )}
        </button>
      </div>

      {/* Projects List */}
      <div className="projects-feed">
        {currentList.map((proj, idx) => (
          <div 
            key={idx} 
            className="project-card glass-panel"
            onClick={() => openProjectDetails(proj)}
          >
            <div className="proj-card-header">
              <span className="proj-card-icon">{proj.icon}</span>
              <div className="proj-card-meta">
                <h3 className="proj-card-title">{proj.title}</h3>
                {proj.company && <span className="proj-card-company">{proj.company}</span>}
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
              {proj.github && (
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
              )}
              {proj.live && (
                <a 
                  href={proj.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="proj-link-icon-btn"
                  aria-label={proj.duration ? `View Certificate for ${proj.title}` : `Visit live demo for ${proj.title}`}
                >
                  <ExternalLink size={12} />
                  {proj.duration ? "Certificate" : "Demo"}
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
                {selectedProject.company && <p className="drawer-company-text">{selectedProject.company}</p>}
                <p className="drawer-tech-text">{selectedProject.tech.join(" · ")}</p>
              </div>
            </div>

            <div className="drawer-body-text">
              <h5 className="drawer-sub-title">Overview</h5>
              <p>{selectedProject.description}</p>
            </div>

            {selectedProject.duration && (
              <div className="drawer-body-text">
                <h5 className="drawer-sub-title">Details</h5>
                <p className="drawer-details-text">
                  📅 {selectedProject.duration}
                  {selectedProject.grade && ` | 🏆 Grade: ${selectedProject.grade}`}
                </p>
                {selectedProject.id && (
                  <p className="drawer-details-text font-mono" style={{ fontSize: "11px", marginTop: "2px" }}>
                    ID: {selectedProject.id} | Student ID: {selectedProject.studentId}
                  </p>
                )}
              </div>
            )}

            <div className="drawer-body-text">
              <h5 className="drawer-sub-title">Key Outcome</h5>
              <p className="drawer-highlight-text">
                <Sparkles size={14} className="spark-inline" />
                {selectedProject.outcomes}
              </p>
            </div>

            <div className="drawer-actions">
              {selectedProject.github && (
                <a 
                  href={selectedProject.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-secondary drawer-link-btn"
                >
                  <FaGithub size={16} />
                  GitHub Code
                </a>
              )}
              {selectedProject.live && (
                <a 
                  href={selectedProject.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-primary drawer-link-btn"
                >
                  <ExternalLink size={16} />
                  {selectedProject.live.endsWith(".pdf") ? "View Certificate" : "View Project"}
                </a>
              )}
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
