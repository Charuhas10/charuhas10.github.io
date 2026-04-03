import { motion } from "framer-motion";
import "../styles/work.css";

const projects = [
  {
    title: "LLM-NET",
    description: "Platform aggregating 100+ Large Language Models across organisations and developers.",
    bullets: [
      "Built dynamic model directory with search, filtering, and category browsing",
      "Implemented seamless light/dark theme switching with persisted user preference",
      "Designed a model detail view with benchmark comparisons and metadata",
    ],
    tech: ["Next.js", "MongoDB", "Vercel"],
    link: "https://llm-net.vercel.app/",
    github: null,
  },
  {
    title: "MOODMAP",
    description: "Daily mood journaling app that tracks emotional patterns and surfaces AI-powered insights.",
    bullets: [
      "Integrated OpenAI API to generate personalised daily mood summaries from journal entries",
      "Built mood trend visualisation with interactive graphs showing emotional history over time",
      "Implemented user authentication and per-user data isolation via Supabase",
    ],
    tech: ["Next.js", "Supabase", "OpenAI API"],
    link: "https://github.com/Charuhas10/MoodMap",
    github: "https://github.com/Charuhas10/MoodMap",
  },
  {
    title: "PLOTFORGE",
    description: "Full-stack web app that generates original movie plots and AI-created posters from a brief outline.",
    bullets: [
      "Built React frontend that sends user outline to a Flask backend for OpenAI processing",
      "Generated unique movie poster images using DALL·E alongside the plot narrative",
      "Designed a clean two-pane UI for input and live preview of generated content",
    ],
    tech: ["React", "Flask", "OpenAI API", "Python"],
    link: "https://github.com/Charuhas10/PlotForge",
    github: "https://github.com/Charuhas10/PlotForge",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Work() {
  return (
    <section className="my-work" id="work">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Projects</span>
          <h2 className="work-heading">My Work</h2>
          <p className="work-sub">A selection of things I&apos;ve built</p>
        </motion.div>

        <motion.div
          className="project-grid"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-60px" }}
        >
          {projects.map((p) => (
            <motion.div key={p.title} className="project-card" variants={cardVariant}>
              <div className="project-card-header">
                <h3 className="project-title">{p.title}</h3>
                <div className="project-links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub ↗
                    </a>
                  )}
                  {p.link && p.link !== p.github && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
                      Live ↗
                    </a>
                  )}
                </div>
              </div>

              <p className="project-desc">{p.description}</p>

              <ul className="project-bullets">
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              <div className="project-tech">
                {p.tech.map((t) => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
