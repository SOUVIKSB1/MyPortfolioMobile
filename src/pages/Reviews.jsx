import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./Reviews.css";

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://myportfoliomobile.onrender.com";

export default function Reviews() {
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem("portfolio_reviews");
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });
  const [dbConnected, setDbConnected] = useState(false);
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
          }
          const dbStatus = res.headers.get("X-Database-Connected");
          if (dbStatus === "true") {
            setDbConnected(true);
          } else {
            setDbConnected(false);
          }
        }
      } catch (err) {
        console.warn("Backend reviews fetch failed. Falling back to local storage.", err);
        setDbConnected(false);
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
        
        const dbStatus = res.headers.get("X-Database-Connected");
        if (dbStatus === "true") {
          setDbConnected(true);
        } else {
          setDbConnected(false);
        }
        
        // Also sync local storage for offline fallback consistency
        const updated = [saved, ...reviews];
        localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
      } else {
        throw new Error(`HTTP error ${res.status}`);
      }
    } catch (err) {
      console.warn("Backend reviews submission failed. Saving to local storage fallback.", err);
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
    <div className="reviews-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        Reviews
      </div>
      <h2 className="section-title">Community Feed</h2>

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
          <div className={`live-pill-wrap ${dbConnected ? "connected" : ""}`}>
            <span className={`live-dot-indicator ${dbConnected ? "connected" : ""}`} />
            <span className="live-feed-label">
              {dbConnected ? "LIVE DATABASE SYNC" : "LOCAL HUB DATA"}
            </span>
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
    </div>
  );
}
