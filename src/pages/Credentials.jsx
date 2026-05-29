import { useState, useEffect } from "react";
import { ExternalLink, Star, Award, ShieldAlert, Phone, Mail, MessageSquare } from "lucide-react";
import BottomSheet from "../components/BottomSheet";
import "./Credentials.css";

const CERTIFICATIONS = [
  {
    title: "Azure AI Fundamentals (AI-900)",
    issuer: "Microsoft Certified",
    date: "APR 2026",
    id: "PUxp-uScT",
    link: "https://www.certiport.com/portal/Pages/PrintTranscriptInfo.aspx?action=Cert&id=455&cvid=26m0VuRk4VtsDk//7ATIrg==",
    icon: "🧠"
  },
  {
    title: "Supervised Machine Learning",
    issuer: "DeepLearning.AI",
    date: "MAR 2025",
    id: "B1DW0ZFLXWSV",
    link: "https://www.coursera.org/account/accomplishments/verify/B1DW0ZFLXWSV",
    icon: "🤖"
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
    title: "Build Your First Chatbot",
    issuer: "IBM",
    date: "NOV 2024",
    id: "ALM-COURSE_3946111",
    link: "https://skills.yourlearning.ibm.com/certificate/ALM-COURSE_3946111",
    icon: "💬"
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
  },
  {
    title: "Getting Started with AI",
    issuer: "IBM",
    date: "NOV 2024",
    id: "PLAN-E624C2604060",
    link: "https://skills.yourlearning.ibm.com/certificate/PLAN-E624C2604060",
    icon: "🤖"
  }
];

const DEFAULT_REVIEWS = [
  {
    name: "Rajarshi Chatterjee",
    role: "SIH Finalist",
    rating: 5,
    comment: "Souvik's cloud architecture setup was flawless. He deployed our Kubernetes nodes and Vertex AI services within hours during the hackathon!",
    date: "Apr 2026"
  },
  {
    name: "Prof U. Das",
    role: "CSE Prof @ Techno Main",
    rating: 5,
    comment: "An exceptionally diligent student. Souvik bridges Frontend and Cloud DevOps with standard design tokens and clean structure.",
    date: "Jan 2026"
  },
  {
    name: "Supriya Satpati",
    role: "Open-source Collaborator",
    rating: 5,
    comment: "Great attention to visual styles. The hacker loading animation transition and full-bleed carousels make this portfolio state-of-the-art.",
    date: "May 2026"
  }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Credentials() {
  const [activeTab, setActiveTab] = useState("licenses");
  const [selectedCert, setSelectedCert] = useState(null);
  
  // Reviews State
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("portfolio_reviews");
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });
  const [isLive, setIsLive] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setReviews(data);
            setIsLive(true);
          }
        }
      } catch (err) {
        console.warn("Backend reviews fetch failed. Falling back to local storage.", err);
      }
    };
    fetchReviews();
  }, []);

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    
    const reviewData = {
      name: name.trim(),
      role: role.trim() || "Visitor",
      rating: Number(rating),
      comment: comment.trim(),
      date: new Date().toLocaleDateString([], { month: "short", year: "numeric" })
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
      });

      if (res.ok) {
        const saved = await res.json();
        setReviews((prev) => [saved, ...prev]);
        setIsLive(true);
        
        // Also sync local storage for offline fallback consistency
        const updated = [saved, ...reviews];
        localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
      } else {
        throw new Error(`HTTP error ${res.status}`);
      }
    } catch (err) {
      console.warn("Backend reviews submission failed. Saving to local storage fallback.", err);
      setIsLive(false);
      const updated = [reviewData, ...reviews];
      setReviews(updated);
      localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
    } finally {
      // Reset form states
      setName("");
      setRole("");
      setRating(5);
      setComment("");
      setIsSubmitting(false);
    }
  };

  // Compute aggregate score
  const aggregateScore = (
    reviews.reduce((acc, cur) => acc + cur.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="credentials-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        Credentials
      </div>
      <h2 className="section-title">Licenses & Feedback</h2>

      {/* Page Tabs */}
      <div className="credentials-tab-bar glass-panel">
        <button
          onClick={() => setActiveTab("licenses")}
          className={`segment-btn ${activeTab === "licenses" ? "active" : ""}`}
        >
          <Award size={15} />
          Certifications
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`segment-btn ${activeTab === "reviews" ? "active" : ""}`}
        >
          <MessageSquare size={15} />
          Community Reviews
        </button>
      </div>

      {/* Tab Panels */}
      <div className="credentials-content-outer">
        {activeTab === "licenses" ? (
          <div className="certifications-panel">
            <div className="certs-grid">
              {CERTIFICATIONS.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="cert-item-card glass-panel"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="cert-item-icon">{cert.icon}</div>
                  <div className="cert-item-details">
                    <h4 className="cert-item-title">{cert.title}</h4>
                    <span className="cert-item-issuer">{cert.issuer}</span>
                  </div>
                  
                  {/* Direct Verification Action */}
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="cert-quick-verify-btn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Verify credentials for ${cert.title}`}
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="reviews-panel">
            {/* Aggregate Metric Card */}
            <div className="rating-summary-card glass-panel border-blue-glow">
              <div className="aggregate-score-wrap">
                <h3 className="aggregate-number">{aggregateScore}</h3>
                <div className="aggregate-stars">
                  <div className="stars-row">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.round(aggregateScore) ? "star-icon active" : "star-icon"} 
                      />
                    ))}
                  </div>
                  <span className="aggregate-count">({reviews.length} ratings)</span>
                </div>
              </div>
              <div className={`live-pill-wrap ${isLive ? 'live-sync' : 'local-fallback'}`}>
                <span className="live-dot-indicator" />
                <span className="live-feed-label">{isLive ? "LIVE DATABASE SYNC" : "LOCAL HUB DATA"}</span>
              </div>
            </div>

            {/* Feedback input form */}
            <div className="review-form-card glass-panel">
              <h4 className="form-heading">Leave a Review</h4>
              <form onSubmit={handleAddReview} className="feedback-form">
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Role (e.g., Designer at IBM)"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="rating-input-row">
                  <span className="rating-label">Rating:</span>
                  <div className="stars-selector">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="star-selector-btn"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star 
                          size={20} 
                          className={(star <= (hoverRating || rating)) ? "star-input active" : "star-input"} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  placeholder="Share details of your experience working together... *"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows="3"
                  required
                />

                <button 
                  type="submit" 
                  className="btn-primary form-submit-btn" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Syncing review..." : "Submit Review"}
                </button>
              </form>
            </div>

            {/* Reviews list */}
            <div className="testimonials-feed-list">
              {reviews.map((rev, index) => (
                <div key={index} className="testimonial-card-item glass-panel">
                  <div className="testi-top">
                    <div>
                      <h5 className="testi-card-name">{rev.name}</h5>
                      <span className="testi-card-role">{rev.role}</span>
                    </div>
                    <span className="testi-card-date">{rev.date}</span>
                  </div>
                  <div className="testi-card-stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star 
                        key={i} 
                        size={11} 
                        className={i < rev.rating ? "star-icon active" : "star-icon"} 
                      />
                    ))}
                  </div>
                  <p className="testi-card-comment">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certification details bottom drawer */}
      <BottomSheet
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title}
      >
        {selectedCert && (
          <div className="cert-drawer-layout">
            <div className="cert-drawer-header">
              <span className="cert-drawer-emoji">{selectedCert.icon}</span>
              <div>
                <h4 className="cert-drawer-issuer">{selectedCert.issuer}</h4>
                <p className="cert-drawer-date">Issued: {selectedCert.date}</p>
              </div>
            </div>

            <div className="cert-drawer-details">
              <div className="cert-drawer-info">
                <span className="info-lbl">Credentials ID</span>
                <span className="info-val">{selectedCert.id}</span>
              </div>
              <div className="cert-drawer-info warning">
                <span className="info-lbl">Verification Status</span>
                <span className="info-val verified">Verified Active</span>
              </div>
              <div className="cert-drawer-info warning">
                <span className="info-lbl">Verification Link</span>
                <a 
                  href={selectedCert.link} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="info-val link"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px", textDecoration: "none",}}
                >
                  <ExternalLink size={12} />
                  Link
                </a>
              </div>
              
              {/* Verification link button just below status */}
              <a 
                href={selectedCert.link} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary cert-verify-btn"
                style={{ marginTop: "8px" }}
              >
                <ExternalLink size={14} />
                Verify Credentials
              </a>
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
