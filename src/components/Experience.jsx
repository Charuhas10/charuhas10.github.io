import { motion } from "framer-motion";
import "../styles/experience.css";

const experiences = [
  {
    company: "Myntra",
    role: "Software Development Engineer",
    period: "Aug 2024 – Present",
    location: "Bangalore, India",
    hasPress: true,
    bullets: [
      "Developed a dynamic React Native widget for the homepage featuring AI-generated image slideshow with interactive annotations leading to product racks.",
      "Enabled users to explore home decor items by interacting with different image styles and tagged products — shipped as Dream Room Inspirations with Google Cloud.",
      "Redesigned an error page to offer clearer UI and distinct messaging for different error codes.",
    ],
  },
  {
    company: "Mercedes-Benz R&D India",
    role: "Software Development Engineer Intern",
    period: "Jun 2024 – Jul 2024",
    location: "Pune, India",
    hasPress: false,
    bullets: [
      "Improved an internal employee training tool describing features being developed at MBRDI.",
      "Designed and implemented a second-person perspective car simulator for enhancing employee training.",
    ],
  },
  {
    company: "SmartBridge",
    role: "SDE Intern – Full Stack",
    period: "Jan 2024 – May 2024",
    location: "Hyderabad, India",
    hasPress: false,
    bullets: [
      "Contributed to development and enhancement of Skill Treasury, an online learning management system.",
      "Designed Profile and Login pages from scratch with user-friendly UI and form validation.",
    ],
  },
  {
    company: "RCTS Lab – IIIT Hyderabad",
    role: "Full Stack Developer Intern",
    period: "May 2023 – Jul 2023",
    location: "Telangana, India",
    hasPress: false,
    bullets: [
      "Collaborated on SELSCA at the Raj Reddy Center for Technology and Society Lab under Dr. Arjun Rajasekar, with a team of 5.",
      "Led frontend syllabus component design integrated with backend APIs, reducing data retrieval time by 30%.",
    ],
  },
];

const cardVariant = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Career</span>
          <h2 className="experience-heading">Where I&apos;ve Worked</h2>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.company}
              className="experience-card"
              variants={cardVariant}
            >
              <div className="exp-dot" />
              <div className="exp-content">
                <div className="exp-header">
                  <div>
                    <h3 className="exp-company">{exp.company}</h3>
                    <p className="exp-role">{exp.role}</p>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">{exp.period}</span>
                    <span className="exp-location">{exp.location}</span>
                    {exp.hasPress && (
                      <a href="#press" className="exp-press-badge">
                        ↗ In The News
                      </a>
                    )}
                  </div>
                </div>
                <ul className="exp-bullets">
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
