import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, GraduationCap, Calendar, Tag, BrickWallFireIcon, BookOpenCheck, ExternalLink } from "lucide-react";
import { triggerHaptic } from "../hooks/haptics";
import "./Journey.css";

const TIMELINE = [
  {
    date: "2023 - Present",
    type: "education",
    icon: <GraduationCap size={20} />,
    title: "B.Tech Computer Science Engineering",
    institution: "Techno Main Salt Lake, Kolkata",
    description: "Deepening core theoretical and practical computer science principles: Algorithms, DBMS, Software Engineering, and Operating Systems. Fusing studies with cloud-native implementations."
  },
  {
    date: "2021 - 2022",
    type: "education",
    icon: <BrickWallFireIcon size={20} />,
    title: "Entrance Exam Preparation",
    institution: "Allen Career Institute - Kota, Rajasthan",
    description: "Intensive preparation for entrance exams with a focus on problem-solving, conceptual clarity, and time management. Completed a 2-year classroom program."
  },
  {
    date: "2019 - 2020",
    type: "education",
    icon: <BookOpenCheck size={20} />,
    title: "Higher Secondary Education",
    institution: "Kenduadihi High School - Bankura, West Bengal",
    description: "Achieved 459 out of 500 marks (91.8%). Subject Combination: Physics, Chemistry, Mathematics, Biology (PCMB)."
  },
  {
    date: "2018",
    type: "education",
    icon: <BookOpenCheck size={20} />,
    title: "Secondary Education (Madhyamik)",
    institution: "Kenduadihi High School - Bankura, West Bengal",
    description: "Achieved 645 out of 700 marks (92.14%)."
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
    title: "Google Cloud Arcade Champion 2025",
    organization: "Google Cloud & Google Skills Program",
    date: "2024 - 2025",
    badge: "Diamond League",
    icon: "☁️",
    description: "Earned Arcade Champion 2025 & Diamond League with 1,00,000+ points. Completed 107+ Skill Badges, 400+ practiced hands-on labs (423 completed), 72+ courses, and 28 arcade games across Kubernetes, Vertex AI, and Cloud Architecture.",
    tags: ["Arcade Champion 2025", "Diamond League (100k+ Pts)", "107+ Badges", "400+ Labs", "Vertex AI", "GCP"],
    links: [
      { label: "Skills Profile 1", url: "https://www.skills.google/public_profiles/57ce5b2f-6df4-4cf5-83fc-f82528bb51fc" },
      { label: "Skills Profile 2", url: "https://www.skills.google/public_profiles/16ea7d05-4436-4228-b43e-7f2bb2bfb07e" }
    ]
  },
  {
    title: "Credly Verified Digital Credentials",
    organization: "Credly by Pearson",
    date: "2024 - Present",
    badge: "Verified Earner",
    icon: "🎖️",
    description: "Official transcript of authenticated professional badges and certificates from Microsoft, AWS Academy, IBM SkillsBuild, and DeepLearning.AI verified on Credly.",
    tags: ["Credly", "Verified Badges", "Microsoft", "AWS", "IBM", "DeepLearning.AI"],
    links: [
      { label: "Badges Transcript", url: "https://www.credly.com/users/souvik-sinhababu.ccd0d18c/badges/credly" },
      { label: "Credly Profile", url: "https://www.credly.com/users/souvik-sinhababu" }
    ]
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
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Handle Swipe Gesture on the Tab / Title Bar
  const handleTouchStart = (e) => {
    const touch = e.touches ? e.touches[0] : e;
    if (touch) {
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches ? e.changedTouches[0] : e;
    if (!touch) return;

    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Strict horizontal swipe check
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0 && activeTab === "timeline") {
        // Swiped Left -> Switch to Milestones
        triggerHaptic(14);
        setActiveTab("achievements");
      } else if (deltaX > 0 && activeTab === "achievements") {
        // Swiped Right -> Switch to Education & Experience
        triggerHaptic(14);
        setActiveTab("timeline");
      }
    }
  };

  return (
    <div className="journey-page-container">
      {/* Title with Swipe Detection */}
      <div 
        className="journey-header-section"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="section-label">
          <span className="dot" />
          My Path
        </div>
        <h2 className="section-title">Journey & Milestones</h2>
        <p className="journey-subtitle">
          Academic foundation, engineering leadership, and cloud hackathon milestones.
        </p>
      </div>

      {/* Main Liquid Glass Tab Bar - Clickable & Swipeable */}
      <div 
        className="journey-liquid-tab-bar"
        onPointerDownCapture={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => {
          e.stopPropagation();
          handleTouchStart(e);
        }}
        onTouchEndCapture={(e) => {
          e.stopPropagation();
          handleTouchEnd(e);
        }}
      >
        <div className="nav-glass-sheen" />
        <button
          onClick={() => {
            if (activeTab !== "timeline") {
              triggerHaptic(12);
              setActiveTab("timeline");
            }
          }}
          className={`journey-liquid-tab ${activeTab === "timeline" ? "active" : ""}`}
        >
          <GraduationCap size={15} />
          <span>Education & Background</span>
          {activeTab === "timeline" && (
            <motion.div 
              className="active-journey-tab-glow"
              layoutId="activeJourneyTabGlow"
            />
          )}
        </button>

        <button
          onClick={() => {
            if (activeTab !== "achievements") {
              triggerHaptic(12);
              setActiveTab("achievements");
            }
          }}
          className={`journey-liquid-tab ${activeTab === "achievements" ? "active" : ""}`}
        >
          <Award size={15} />
          <span>Milestones ({ACHIEVEMENTS.length})</span>
          {activeTab === "achievements" && (
            <motion.div 
              className="active-journey-tab-glow"
              layoutId="activeJourneyTabGlow"
            />
          )}
        </button>
      </div>

      {/* Panel Contents with Liquid Glass treatment */}
      <div className="journey-content-outer">
        <AnimatePresence mode="wait">
          {activeTab === "timeline" ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="timeline-panel"
            >
              <div className="timeline-trail" />
              {TIMELINE.map((time, idx) => (
                <div key={idx} className="timeline-node">
                  {/* Timeline Badge Dot */}
                  <div className={`node-badge border-orange-glow ${time.type}`}>
                    {time.icon}
                  </div>

                  {/* Liquid Glass Card Content */}
                  <div className="node-card liquid-glass-tile">
                    <div className="liquid-glass-sheen" />
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="achievements-panel"
            >
              {ACHIEVEMENTS.map((ach, idx) => (
                <div key={idx} className="achievement-item-card liquid-glass-tile">
                  <div className="liquid-glass-sheen" />
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

                  {ach.links && ach.links.length > 0 && (
                    <div 
                      className="ach-card-links-row"
                      onPointerDownCapture={(e) => e.stopPropagation()}
                      onTouchStartCapture={(e) => e.stopPropagation()}
                      onTouchMoveCapture={(e) => e.stopPropagation()}
                      onTouchEndCapture={(e) => e.stopPropagation()}
                    >
                      {ach.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ach-link-pill-btn"
                          onClick={() => triggerHaptic(10)}
                        >
                          <span>{link.label}</span>
                          <ExternalLink size={11} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
