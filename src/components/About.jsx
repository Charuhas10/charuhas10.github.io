import { motion } from "framer-motion";
import "../styles/about.css";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  return (
    <section className="about-me" id="about">
      <div className="section-inner">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span className="section-tag" variants={fadeUp}>
            About
          </motion.span>
          <motion.h2 className="about-title" variants={fadeUp}>
            Who am I
          </motion.h2>
          <motion.div className="about-me-body" variants={stagger}>
            <motion.p variants={fadeUp}>
              Hey, I&apos;m Charuhas Reddy Balam — a Full-Stack Developer who
              builds fast, responsive, and polished applications. Currently
              working as a Software Development Engineer at Myntra, where I
              work with React Native and Go.
            </motion.p>
            <motion.p variants={fadeUp}>
              I like diving into hard problems and coming out the other side
              with something that actually works well. Whether it&apos;s a
              widget that reaches millions of users or a side project I hacked
              together at 2am — I care about the craft.
            </motion.p>
            <motion.p variants={fadeUp}>
              When I&apos;m not at the keyboard, I&apos;m on the tennis court,
              lost in a book, grinding a game, or halfway through a movie
              marathon.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
