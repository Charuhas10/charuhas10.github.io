import { motion } from "framer-motion";
import "../styles/skills.css";

const categories = [
  {
    label: "Languages",
    skills: [
      { name: "C++", icon: "/icons/c++.png" },
      { name: "C", icon: "/icons/c.png" },
      { name: "Java", icon: "/icons/java.png" },
      { name: "JavaScript", icon: "/icons/js.png" },
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
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      style={skill.wide ? { width: "auto", height: "72px" } : {}}
                    />
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
