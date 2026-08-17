import { useState, useMemo } from "react";
import { ExternalLink, Copy, Check, ShieldCheck, Search, X, Sparkles, Layers } from "lucide-react";
import BottomSheet from "../components/BottomSheet";
import { triggerHaptic } from "../hooks/haptics";
import "./Credentials.css";

export const CERT_TIERS = [
  {
    id: "tier-1",
    tierNumber: 1,
    tierLabel: "Tier 1",
    title: "Global Flagships & Academic",
    shortTitle: "Tier 1 • Flagship",
    description: "Proctored industry benchmarks, premier cloud credentials & national AI internships",
    icon: "🌟",
    accentColor: "#f59e0b",
    gradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.02) 100%)",
    borderColor: "rgba(245, 158, 11, 0.25)",
    certs: [
      {
        title: "Azure AI Fundamentals (AI-900)",
        issuer: "Microsoft Certified",
        date: "APR 2026",
        id: "PUxp-uScT",
        link: "https://www.certiport.com/portal/Pages/PrintTranscriptInfo.aspx?action=Cert&id=455&cvid=26m0VuRk4VtsDk//7ATIrg==",
        icon: "🧠"
      },
      {
        title: "AWS Academy Graduate - Data Engineering",
        issuer: "AWS Academy",
        date: "JUL 2026",
        id: "AWS-Academy-DE",
        link: "/certificates/aws_academy_graduate_data_engineering.pdf",
        icon: "☁️"
      },
      {
        title: "AICTE | IBM SkillsBuild Internship - Data Analytics with AI",
        issuer: "AICTE • IBM SkillsBuild",
        date: "AUG 2026",
        id: "PLAN-D44A9C2C463C",
        link: "https://skills.yourlearning.ibm.com/certificate/PLAN-D44A9C2C463C",
        icon: "📊"
      },
      {
        title: "NPTEL Java Certification",
        issuer: "IIT Kharagpur",
        date: "NOV 2025",
        id: "NPTEL25CS110S460803974",
        link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs110/Course/NPTEL25CS110S46080397410888267.pdf",
        icon: "☕"
      },
      {
        title: "Data Base Management System",
        issuer: "IIT Kharagpur",
        date: "MAR 2026",
        id: "NPTEL26CS39S660101642",
        link: "https://nptel.ac.in/noc/E_Certificate/NOC26CS39S66010164203151734",
        icon: "💿"
      }
    ]
  },
  {
    id: "tier-2",
    tierNumber: 2,
    tierLabel: "Tier 2",
    title: "Applied AI, Agents & RAG",
    shortTitle: "Tier 2 • AI & RAG",
    description: "Autonomous multi-agent workflows, neural retrieval (RAG) & transformer pipelines",
    icon: "🤖",
    accentColor: "#a855f7",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(168, 85, 247, 0.02) 100%)",
    borderColor: "rgba(168, 85, 247, 0.25)",
    certs: [
      {
        title: "Make Agentic AI Work for You",
        issuer: "IBM SkillsBuild",
        date: "AUG 2026",
        id: "PLAN-37BFD561DC25",
        link: "https://skills.yourlearning.ibm.com/certificate/PLAN-37BFD561DC25",
        icon: "🤖"
      },
      {
        title: "Introduction to Retrieval-Augmented Generation (RAG)",
        issuer: "IBM SkillsBuild",
        date: "AUG 2026",
        id: "IBM-RAG-AI",
        link: "https://skills.yourlearning.ibm.com/",
        icon: "🔍"
      },
      {
        title: "Introduction to Agentic AI",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-IAAI",
        link: "/certificates/introduction_to_agentic_ai.pdf",
        icon: "🤖"
      },
      {
        title: "Generative AI Essentials: Using LLMs to Work with Data",
        issuer: "IBM SkillsBuild",
        date: "AUG 2026",
        id: "PLAN-D0F12976D81A",
        link: "https://skills.yourlearning.ibm.com/certificate/PLAN-D0F12976D81A",
        icon: "✨"
      },
      {
        title: "Prompt Engineering Foundation",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-PEF",
        link: "/certificates/prompt_engineering_foundation.pdf",
        icon: "✍️"
      },
      {
        title: "Fundamentals of Generative AI",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-FGAI",
        link: "/certificates/fundamentals_of_generative_ai.pdf",
        icon: "✨"
      },
      {
        title: "Supervised Machine Learning",
        issuer: "DeepLearning.AI",
        date: "MAR 2025",
        id: "B1DW0ZFLXWSV",
        link: "https://www.coursera.org/account/accomplishments/verify/B1DW0ZFLXWSV",
        icon: "🤖"
      }
    ]
  },
  {
    id: "tier-3",
    tierNumber: 3,
    tierLabel: "Tier 3",
    title: "Cloud, Backend & Tooling",
    shortTitle: "Tier 3 • Cloud & Dev",
    description: "Enterprise backend engineering, Google Cloud infrastructure & API ecosystems",
    icon: "☁️",
    accentColor: "#38bdf8",
    gradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0.02) 100%)",
    borderColor: "rgba(56, 189, 248, 0.25)",
    certs: [
      {
        title: ".Net Backend Engineer",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-NBE",
        link: "/certificates/dotnet_backend_engineer.pdf",
        icon: "🖥️"
      },
      {
        title: "Google Cloud Fundamentals",
        issuer: "Google Cloud",
        date: "NOV 2024",
        id: "13038962",
        link: "https://www.skills.google/public_profiles/16ea7d05-4436-4228-b43e-7f2bb2bfb07e/badges/13038962?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share",
        icon: "☁️"
      },
      {
        title: "GitHub Copilot Fundamentals Virtual Training",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-GHCF",
        link: "/certificates/github_copilot_fundamentals.pdf",
        icon: "🐙"
      },
      {
        title: "Postman API Fundamentals Student Expert",
        issuer: "Postman",
        date: "OCT 2024",
        id: "P-APIFSE",
        link: "https://badgr.com/public/assertions/94n1wX7sQ3a1_QYdO-sTlw?identity__email=souviksinhababu88%40gmail.com",
        icon: "🚀"
      },
      {
        title: "Foundations of Modern AI",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-FMAI",
        link: "/certificates/foundations_of_modern_ai.pdf",
        icon: "🧠"
      }
    ]
  },
  {
    id: "tier-4",
    tierNumber: 4,
    tierLabel: "Tier 4",
    title: "Strategic AI & Data Systems",
    shortTitle: "Tier 4 • Strategy & Data",
    description: "Enterprise GenAI readiness, core data processing principles & Agile execution",
    icon: "📈",
    accentColor: "#10b981",
    gradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(16, 185, 129, 0.02) 100%)",
    borderColor: "rgba(16, 185, 129, 0.25)",
    certs: [
      {
        title: "Getting Started with Data (Data Fundamentals)",
        issuer: "IBM SkillsBuild",
        date: "AUG 2026",
        id: "PLAN-14F2691E3A32",
        link: "https://skills.yourlearning.ibm.com/certificate/PLAN-14F2691E3A32",
        icon: "📈"
      },
      {
        title: "Generative AI for Decision Makers",
        issuer: "AWS",
        date: "JAN 2026",
        id: "MHMHDAWQJY",
        link: "https://drive.google.com/file/d/1KZHjC9anMhmh7OM8oNQ_YJv7tcCdspen/view?usp=sharing",
        icon: "🤖"
      },
      {
        title: "Building a GenAI-Ready Org",
        issuer: "AWS",
        date: "JAN 2026",
        id: "BYXUKTZR8P",
        link: "https://drive.google.com/file/d/1gn5Q4QC91x-h_bqu1dJOzly3hhjnZA7J/view?usp=sharing",
        icon: "🏢"
      },
      {
        title: "Programming with Python",
        issuer: "University of Michigan",
        date: "APR 2024",
        id: "B3NXLPE9QYBY",
        link: "https://www.coursera.org/account/accomplishments/verify/B3NXLPE9QYBY",
        icon: "🐍"
      },
      {
        title: "Introduction to Git & GitHub",
        issuer: "Google",
        date: "MAR 2025",
        id: "TECWACAUJK9B",
        link: "https://www.coursera.org/account/accomplishments/verify/TECWACAUJK9B",
        icon: "🌐"
      },
      {
        title: "ITPM - Introduction to Agile [101-Basics]",
        issuer: "Cognizant",
        date: "JUL 2026",
        id: "CS-ITPM",
        link: "/certificates/itpm_introduction_to_agile.pdf",
        icon: "🔄"
      }
    ]
  },
  {
    id: "tier-5",
    tierNumber: 5,
    tierLabel: "Tier 5",
    title: "Foundational & Core Modules",
    shortTitle: "Tier 5 • Foundations",
    description: "Core AI history, conversational chatbots & web architecture fundamentals",
    icon: "📚",
    accentColor: "#f43f5e",
    gradient: "linear-gradient(135deg, rgba(244, 63, 94, 0.12) 0%, rgba(244, 63, 94, 0.02) 100%)",
    borderColor: "rgba(244, 63, 94, 0.25)",
    certs: [
      {
        title: "Large Language Model Basics",
        issuer: "IBM",
        date: "NOV 2024",
        id: "MDL-433",
        link: "https://skills.yourlearning.ibm.com/certificate/MDL-433",
        icon: "🤖"
      },
      {
        title: "Introduction to Artificial Intelligence",
        issuer: "IBM",
        date: "NOV 2024",
        id: "MDL-211",
        link: "https://skills.yourlearning.ibm.com/certificate/MDL-211",
        icon: "🧠"
      },
      {
        title: "Getting Started with AI",
        issuer: "IBM",
        date: "NOV 2024",
        id: "PLAN-E624C2604060",
        link: "https://skills.yourlearning.ibm.com/certificate/PLAN-E624C2604060",
        icon: "🤖"
      },
      {
        title: "Build Your First Chatbot",
        issuer: "IBM",
        date: "NOV 2024",
        id: "ALM-COURSE_3946111",
        link: "https://skills.yourlearning.ibm.com/certificate/ALM-COURSE_3946111",
        icon: "💬"
      },
      {
        title: "Web Development Basics",
        issuer: "IBM",
        date: "MAY 2026",
        id: "ALM-COURSE_4058937",
        link: "https://skills.yourlearning.ibm.com/certificate/ALM-COURSE_4058937",
        icon: "🌐"
      },
      {
        title: "AI for Beginners HP LIFE (HPL-EN40)",
        issuer: "HP",
        date: "DEC 2024",
        id: "883eaf58-4da8-46f3-b35c-297d22f17c6a",
        link: "https://www.life-global.org/certificate/883eaf58-4da8-46f3-b35c-297d22f17c6a",
        icon: "💻"
      }
    ]
  }
];

export const CERTIFICATIONS = CERT_TIERS.flatMap(tier =>
  tier.certs.map(cert => ({
    ...cert,
    tierId: tier.id,
    tierNumber: tier.tierNumber,
    tierLabel: tier.tierLabel,
    tierTitle: tier.title,
    tierColor: tier.accentColor,
    tierIcon: tier.icon
  }))
);

export default function Credentials() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeTier, setActiveTier] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyId = (id) => {
    triggerHaptic(15);
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(id).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredTiers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    return CERT_TIERS.map(tier => {
      // If tier filter is active and doesn't match, return null
      if (activeTier !== "all" && tier.id !== activeTier) {
        return null;
      }

      // If search query is present, filter certs within this tier
      if (query) {
        const matchingCerts = tier.certs.filter(c =>
          c.title.toLowerCase().includes(query) ||
          c.issuer.toLowerCase().includes(query) ||
          c.id.toLowerCase().includes(query)
        );

        if (matchingCerts.length === 0) return null;

        return {
          ...tier,
          certs: matchingCerts
        };
      }

      return tier;
    }).filter(Boolean);
  }, [activeTier, searchQuery]);

  return (
    <div className="credentials-page-container">
      {/* Title Header */}
      <div className="credentials-header-section">
        <div className="section-label">
          <span className="dot" />
          Verified Credentials
        </div>
        <h2 className="section-title">Licenses & Certifications</h2>
        <p className="credentials-subtitle">
          29 credentials structured into 5 market-aligned engineering tiers.
        </p>
      </div>

      {/* Instant Search Bar */}
      <div className="cert-search-wrapper glass-panel">
        <Search size={16} className="cert-search-icon" />
        <input
          type="text"
          placeholder="Search by title, issuer, or credential ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="cert-search-input"
          aria-label="Search certifications"
        />
        {searchQuery && (
          <button
            className="cert-search-clear"
            onClick={() => {
              triggerHaptic(8);
              setSearchQuery("");
            }}
            aria-label="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Tier Filter Horizontal Pill Scroller - with touch isolation */}
      <div 
        className="tier-filter-scroll-wrapper"
        onPointerDownCapture={(e) => e.stopPropagation()}
        onTouchStartCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
        onTouchEndCapture={(e) => e.stopPropagation()}
      >
        <div className="tier-filter-bar">
          <button
            className={`tier-pill-btn ${activeTier === "all" ? "active" : ""}`}
            onClick={() => {
              triggerHaptic(12);
              setActiveTier("all");
            }}
          >
            <Layers size={13} />
            <span>All Tiers</span>
            <span className="tier-pill-count">{CERTIFICATIONS.length}</span>
          </button>

          {CERT_TIERS.map((tier) => (
            <button
              key={tier.id}
              className={`tier-pill-btn ${activeTier === tier.id ? "active" : ""}`}
              style={{
                "--tier-color": tier.accentColor
              }}
              onClick={() => {
                triggerHaptic(12);
                setActiveTier(tier.id);
              }}
            >
              <span className="tier-pill-label">{tier.shortTitle}</span>
              <span className="tier-pill-count">{tier.certs.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Tier Sections Display */}
      <div className="certifications-panel">
        {filteredTiers.length === 0 ? (
          <div className="no-certs-found glass-panel">
            <Search size={32} className="no-certs-icon" />
            <h4>No Certifications Found</h4>
            <p>No credentials match &ldquo;{searchQuery}&rdquo;. Try another search term or reset filters.</p>
            <button
              className="btn-primary reset-filter-btn"
              onClick={() => {
                triggerHaptic(10);
                setSearchQuery("");
                setActiveTier("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredTiers.map((tier) => (
            <div key={tier.id} className="tier-section-block">
              {/* Refined Tier Banner Header */}
              <div 
                className="tier-banner-header"
                style={{
                  background: tier.gradient,
                  borderColor: tier.borderColor
                }}
              >
                <div className="tier-banner-top">
                  <div className="tier-label-badge" style={{ color: tier.accentColor, borderColor: `${tier.accentColor}55`, background: `${tier.accentColor}18` }}>
                    <span className="tier-badge-dot" style={{ background: tier.accentColor }} />
                    <span>{tier.tierLabel}</span>
                  </div>
                  <h3 className="tier-banner-title">{tier.title}</h3>
                  <span className="tier-banner-count">{tier.certs.length}</span>
                </div>
                <p className="tier-banner-desc">{tier.description}</p>
              </div>

              {/* Tier Cards Grid */}
              <div className="certs-grid">
                {tier.certs.map((cert, idx) => (
                  <div
                    key={cert.id + idx}
                    className="cert-item-card glass-panel"
                    onClick={() => {
                      triggerHaptic(15);
                      setSelectedCert({
                        ...cert,
                        tierLabel: tier.tierLabel,
                        tierTitle: tier.title,
                        tierColor: tier.accentColor,
                        tierIcon: tier.icon
                      });
                    }}
                  >
                    <div className="cert-item-icon">{cert.icon}</div>
                    <div className="cert-item-details">
                      <div className="cert-item-header-row">
                        <span 
                          className="cert-tier-mini-badge"
                          style={{
                            color: tier.accentColor,
                            borderColor: `${tier.accentColor}40`,
                            background: `${tier.accentColor}12`
                          }}
                        >
                          {tier.tierLabel}
                        </span>
                        <span className="cert-item-date-badge">{cert.date}</span>
                      </div>
                      <h4 className="cert-item-title">{cert.title}</h4>
                      <span className="cert-item-issuer">{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Certification details rich bottom modal */}
      <BottomSheet
        isOpen={selectedCert !== null}
        onClose={() => {
          triggerHaptic(8);
          setSelectedCert(null);
          setCopied(false);
        }}
        title="Credential Verification"
      >
        {selectedCert && (
          <div className="cert-drawer-layout">
            {/* Header */}
            <div className="cert-drawer-header">
              <span className="cert-drawer-emoji">{selectedCert.icon}</span>
              <div className="cert-drawer-header-meta">
                <div 
                  className="cert-drawer-tier-pill"
                  style={{
                    color: selectedCert.tierColor,
                    borderColor: `${selectedCert.tierColor}55`,
                    background: `${selectedCert.tierColor}18`
                  }}
                >
                  <Sparkles size={11} />
                  <span>{selectedCert.tierLabel} • {selectedCert.tierTitle}</span>
                </div>
                <h3 className="cert-drawer-title">{selectedCert.title}</h3>
                <h4 className="cert-drawer-issuer">{selectedCert.issuer}</h4>
              </div>
            </div>

            {/* Verified Active Badge */}
            <div className="cert-status-badge">
              <ShieldCheck size={16} className="status-shield-icon" />
              <span>Officially Verified & Authenticated • {selectedCert.date}</span>
            </div>

            <div className="cert-drawer-details">
              {/* Credential ID row with 1-Click Copy */}
              <div className="cert-drawer-info copyable">
                <div className="info-text-group">
                  <span className="info-lbl">Credential ID</span>
                  <span className="info-val">{selectedCert.id}</span>
                </div>
                <button
                  onClick={() => handleCopyId(selectedCert.id)}
                  className="cert-copy-btn"
                  aria-label="Copy credential ID"
                >
                  {copied ? <Check size={14} style={{ color: "#10b981" }} /> : <Copy size={14} />}
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Tier Classification */}
              <div className="cert-drawer-info">
                <span className="info-lbl">Tier Level</span>
                <span className="info-val" style={{ color: selectedCert.tierColor, fontWeight: 700 }}>
                  {selectedCert.tierLabel} • {selectedCert.tierTitle}
                </span>
              </div>

              {/* Issuer Organization */}
              <div className="cert-drawer-info">
                <span className="info-lbl">Issuing Body</span>
                <span className="info-val issuer-name">{selectedCert.issuer}</span>
              </div>

              {/* Issue Date */}
              <div className="cert-drawer-info">
                <span className="info-lbl">Issued Period</span>
                <span className="info-val">{selectedCert.date}</span>
              </div>
            </div>

            {/* Direct Verification Action Buttons */}
            <div className="cert-drawer-actions">
              <a
                href={selectedCert.link}
                target="_blank"
                rel="noreferrer"
                className="btn-primary cert-action-main"
                onClick={() => triggerHaptic(12)}
              >
                <ExternalLink size={15} />
                <span>Verify Credential on Portal</span>
              </a>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
