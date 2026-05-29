import { useState } from "react";
import { ExternalLink } from "lucide-react";
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

export default function Credentials() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="credentials-page-container">
      {/* Title */}
      <div className="section-label">
        <span className="dot" />
        Credentials
      </div>
      <h2 className="section-title">Licenses & Certs</h2>

      {/* Certifications Panel */}
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
            </div>
          ))}
        </div>
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
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
}
