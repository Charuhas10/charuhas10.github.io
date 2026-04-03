import { motion } from "framer-motion";
import Carousel from "./Carousel";
import "../styles/work.css";

const items = [
  {
    image: "/LLM.jpeg",
    title: "LLM-NET",
    description:
      "A dynamic application showcasing Large Language Models deployed by organisations and developers. Built with Next.js and MongoDB, with seamless light/dark theme switching.",
    link: "https://llm-net.vercel.app/",
  },
  {
    image: "/LMS.jpeg",
    title: "SKILL TREASURY",
    description:
      "Online learning management system built with Next.js and MongoDB. Users can browse courses in Web Dev, Data Science, and ML, track progress, and earn certificates.",
    link: "https://lms-six-ashy.vercel.app/",
  },
  {
    image: "/moodmap.jpeg",
    title: "MOODMAP",
    description:
      "Daily mood journaling app built with Next.js and Supabase. Leverages OpenAI API to provide daily mood summaries and tracks emotional trends via graphs.",
    link: "https://github.com/Charuhas10/MoodMap",
  },
  {
    image: "/moviememo.jpeg",
    title: "MOVIE MEMO",
    description:
      "Sleek web app for movie enthusiasts to track watchlists. Built with HTML, CSS, JavaScript, and Firebase.",
    link: "https://movie-memo.netlify.app/",
  },
  {
    image: "/plotforge.jpeg",
    title: "PLOTFORGE",
    description:
      "Create AI-generated movie plots and posters from an outline. Built with React and a Flask backend using the OpenAI API.",
    link: "https://github.com/Charuhas10/PlotForge",
  },
  {
    image: "/etch.jpeg",
    title: "ETCH-A-SKETCH",
    description:
      "Web-based implementation of the classic drawing toy. Draw and create artwork using your mouse, built with HTML, CSS, and JavaScript.",
    link: "https://charuhas10.github.io/Etch-a-Sketch/",
  },
  {
    image: "/chromaShift.jpeg",
    title: "CHROMA SHIFT",
    description:
      "Input any hex color and lighten or darken it. Simple and clean utility built with HTML, CSS, and JavaScript.",
    link: "https://charuhas10.github.io/ChromaShift/",
  },
];

export default function Work() {
  return (
    <section className="my-work" id="work">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Projects</span>
          <h2 className="work-heading">My Work</h2>
          <p className="work-sub">A selection of things I&apos;ve built</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <Carousel items={items} />
        </motion.div>
      </div>
    </section>
  );
}
