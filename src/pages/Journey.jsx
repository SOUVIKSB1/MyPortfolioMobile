import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, GraduationCap, Calendar, Tag } from "lucide-react";
import "./Journey.css";

const TIMELINE = [
  {
    date: "2023 - Present",
    type: "education",
    icon: <GraduationCap size={16} />,
    title: "B.Tech Computer Science Engineering",
    institution: "Techno Main Salt Lake, Kolkata",
    description: "Deepening core theoretical and practical computer science principles: Algorithms, DBMS, Software Engineering, and Operating Systems. Fusing studies with cloud-native implementations."
  },
  {
    date: "2024 - 2025",
    type: "experience",
    icon: <Briefcase size={16} />,
    title: "Cloud & DevOps Projects",
    institution: "Academic & Personal Repositories",
    description: "Designed automated CI/CD code triggers, containerized complex full-stack services using Docker, and deployed nodes on Google Kubernetes Engine (GKE)."
  },
  {
    date: "2023 - 2024",
    type: "experience",
    icon: <Briefcase size={16} />,
    title: "Full-Stack Web Projects",
    institution: "Freelance & Open-Source",
    description: "Engineered robust APIs in Node.js/Express, designed schemas using MongoDB and PostgreSQL, and built high-performance responsive frontend interfaces in React."
  }
];

const ACHIEVEMENTS = [
  {
    title: "Smart India Hackathon '25 Finalist",
    organization: "Ministry of Education, Govt. of India",
    date: "DEC 2025",
    badge: "National Finalist",
    icon: "🏆",
    description: "Led a 6-member team to the grand finale of India's largest hackathon. Architected a cloud-native GKE containerized platform monitoring Heavy Metal Pollution Indices.",
    tags: ["Cloud Native", "Leadership", "Kubernetes", "GKE"]
  },
  {
    title: "Google Cloud Arcade Champion",
    organization: "Google Cloud Program",
    date: "DEC 2024",
    badge: "Cloud Champion",
    icon: "☁️",
    description: "Achieved Champion tier after completing 140+ skill badges on Kubernetes, cloud network security, BigQuery data analytics, and Vertex AI models.",
    tags: ["GCP", "Kubernetes", "Cloud Security", "Vertex AI"]
  },
  {
    title: "DSA & Problem Solving",
    organization: "LeetCode & GeeksforGeeks",
    date: "2024 - Present",
    badge: "Problem Solver",
    icon: "🧮",
    description: "Solved 300+ advanced algorithmic challenges on LeetCode and GFG. Strong mastery of trees, state graphs, and dynamic programming.",
    tags: ["Data Structures", "Algorithms", "Java", "Python"]
  },
  {
    title: "Robotics Finalist (Autobots)",
    organization: "Techno Main Salt Lake",
    date: "MAR 2024",
    badge: "Robotics Lead",
    icon: "🤖",
    description: "Finalist in the campus robotics league. Engineered and programmed an autonomous line-follower and obstacle-avoidance robot using PID controllers.",
    tags: ["Arduino", "Sensors", "PID Loops", "Autonomous"]
  },
  {
    title: "3-Years Class Representative",
    organization: "Techno Main Salt Lake",
    date: "2023 - Present",
    badge: "Student Leader",
    icon: "👥",
    description: "Elected Batch Representative coordinating academics for 130+ students. Facilitated faculty alignments and organized technical coding workshops.",
    tags: ["Communication", "Coordination", "Event Planning"]
  },
  {
    title: "IEEE Student Member",
    organization: "IEEE Section",
    date: "2024 - Present",
    badge: "Professional",
    icon: "🌐",
    description: "Active member participating in technical workshops, peer code reviews, and hosting student hackathons on campus.",
    tags: ["Networking", "Collaboration", "Technical Writing"]
  }
];

export default function Journey() {
  const [activeTab, setActiveTab] = useState("timeline");

  return (
    <div className="journey-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        My Path
      </div>
      <h2 className="section-title">Journey & Achievements</h2>

      {/* Segment Selector tabs */}
      <div className="journey-tab-bar glass-panel">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`segment-btn ${activeTab === "timeline" ? "active" : ""}`}
        >
          <GraduationCap size={16} />
          Education & Experience
          {activeTab === "timeline" && (
            <motion.div 
              className="active-segment-line"
              layoutId="journeyTabLine"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`segment-btn ${activeTab === "achievements" ? "active" : ""}`}
        >
          <Award size={16} />
          Milestones
          {activeTab === "achievements" && (
            <motion.div 
              className="active-segment-line"
              layoutId="journeyTabLine"
            />
          )}
        </button>
      </div>

      {/* Panel Contents */}
      <div className="journey-content-outer">
        <AnimatePresence mode="wait">
          {activeTab === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="timeline-panel"
            >
              <div className="timeline-trail" />
              {TIMELINE.map((time, idx) => (
                <div key={idx} className="timeline-node">
                  {/* Timeline Badge Dot */}
                  <div className={`node-badge border-orange-glow ${time.type}`}>
                    {time.icon}
                  </div>

                  {/* Card Content */}
                  <div className="node-card glass-panel">
                    <span className="node-date">
                      <Calendar size={12} className="inline-icon" />
                      {time.date}
                    </span>
                    <h4 className="node-title">{time.title}</h4>
                    <h5 className="node-institution">{time.institution}</h5>
                    <p className="node-desc">{time.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="achievements"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="achievements-panel"
            >
              {ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="achievement-item-card glass-panel border-blue-glow">
                  <div className="ach-card-top">
                    <div className="ach-card-icon-wrap">
                      <span className="ach-card-emoji">{ach.icon}</span>
                      <div>
                        <h4 className="ach-card-title">{ach.title}</h4>
                        <span className="ach-card-org">{ach.organization}</span>
                      </div>
                    </div>
                    <span className="ach-card-badge">{ach.badge}</span>
                  </div>

                  <p className="ach-card-desc">{ach.description}</p>

                  <div className="ach-card-tags">
                    {ach.tags.map((tag) => (
                      <span key={tag} className="ach-tag-badge">
                        <Tag size={10} className="tag-inline-icon" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
