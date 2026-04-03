import { motion } from "framer-motion";
import "../styles/skills.css";

// GoLang inline SVG logo (official Go blue)
const GoLogo = () => (
  <svg viewBox="0 0 206 78" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 48, height: 20 }}>
    <path d="M16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6l-36.2-.1zM1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6l-47.3.1zM25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.6-.7.6l-21.8.0z" fill="#00ACD7"/>
    <path d="M153.1 19.6c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7h-19.3c-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3C93.2 8.7 102.1 2.8 113.3.9c9.4-1.6 18.3-.3 26.3 5.1 5.3 3.5 9.1 8.3 11.6 14.2.6.9.2 1.4-1.1 1.4z" fill="#00ACD7"/>
    <path d="M186.2 64.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.1 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .8zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" fill="#00ACD7"/>
  </svg>
);

const categories = [
  {
    label: "Languages",
    skills: [
      { name: "C++", icon: "/icons/c++.png" },
      { name: "C", icon: "/icons/c.png" },
      { name: "Java", icon: "/icons/java.png" },
      { name: "JavaScript", icon: "/icons/js.png" },
      { name: "GoLang", svgComponent: GoLogo },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "HTML", icon: "/icons/html.png" },
      { name: "CSS", icon: "/icons/css.png" },
      { name: "React", icon: "/icons/react.png" },
      { name: "Next.js", icon: "/icons/next.png", wide: true },
      { name: "Tailwind CSS", icon: "/icons/tailwind.png" },
    ],
  },
  {
    label: "Backend & DB",
    skills: [
      { name: "Node.js", icon: "/icons/node.png" },
      { name: "MySQL", icon: "/icons/mysql.png" },
      { name: "MongoDB", icon: "/icons/mongo.png" },
      { name: "Prisma", icon: "/icons/prisma.png" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Git", icon: "/icons/git.png" },
      { name: "Postman", icon: "/icons/postman.png" },
    ],
  },
];

const iconVariant = {
  hidden: { opacity: 0, scale: 0.75, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const categoryVariant = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Toolkit</span>
          <h2 className="skills-title">Skills</h2>
        </motion.div>

        <div className="skills-categories">
          {categories.map((cat) => (
            <motion.div
              key={cat.label}
              className="skills-category"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={categoryVariant}
            >
              <motion.h3
                className="skills-category-label"
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4 },
                  },
                }}
              >
                {cat.label}
              </motion.h3>
              <div className="skills-row">
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="skill"
                    variants={iconVariant}
                  >
                    {skill.svgComponent ? (
                      <div className="skill-svg-wrap">
                        <skill.svgComponent />
                      </div>
                    ) : (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        style={skill.wide ? { width: "auto", height: "48px" } : {}}
                      />
                    )}
                    <span className="skill-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
