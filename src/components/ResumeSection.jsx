import { motion } from "framer-motion";
import "../styles/resume.css";

const highlights = [
  "2+ years building full-stack applications",
  "React Native · GoLang · Next.js · Node.js · MongoDB",
  "SDE @ Myntra — work featured in The Hindu & Business Standard",
  "AI integrations, mobile widgets, and developer tooling",
];

export default function ResumeSection() {
  return (
    <section className="resume-section" id="resume">
      <div className="section-inner">
        <motion.div
          className="resume-inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="resume-highlights">
            {highlights.map((h, i) => (
              <motion.p
                key={i}
                className="resume-highlight-line"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <span className="resume-dash">—</span>
                {h}
              </motion.p>
            ))}
          </div>

          <div className="resume-cta-wrap">
            <p className="resume-label">Want the full picture?</p>
            <a
              href="/resume.pdf"
              download="Charuhas_Reddy_Balam_Resume.pdf"
              className="resume-download-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
