import Carousel from "./Carousel";
import "../styles/work.css";

export default function Work() {
  const items = [
    {
      image: "/LLM.jpeg",
      title: "LLM-NET",
      description:
        "An application that showcases the various models deployed by organisations and developers alike. Built using NEXT.JS and MongoDB, it utilizes  ",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/LMS.jpeg",
      title: "SKILL TREASURY",
      description: "Description of Project 3",
      link: "https://lms-six-ashy.vercel.app/",
    },
    {
      image: "/moodmap.jpeg",
      title: "MOODMAP",
      description: "Description of Project 2",
      link: "https://github.com/Charuhas10/MoodMap",
    },
    {
      image: "/moviememo.jpeg",
      title: "MOVIE MEMO",
      description:
        "MovieMemo is a sleek and user-friendly web application designed to help movie enthusiasts keep track of the films they want to watch",
      link: "https://movie-memo.netlify.app/",
    },
    {
      image: "/plotforge.jpeg",
      title: "PLOTFORGE",
      description: "Description of Project 3",
      link: "https://github.com/Charuhas10/PlotForge",
    },
    {
      image: "/etch.jpeg",
      title: "ETCH-A-SKETCH",
      description:
        "The Etch-a-Sketch project is a web-based implementation of the classic toy that allows users to draw and create artwork using their mouse. It provides a nostalgic experience while embracing modern web technologies.",
      link: "https://charuhas10.github.io/Etch-a-Sketch/",
    },
    {
      image: "/chromaShift.jpeg",
      title: "CHROMA SHIFT",
      description:
        "ChromaShift is a simple web application that allows users to input any color in hex code and provides them with the option to lighten or darken the color",
      link: "https://charuhas10.github.io/ChromaShift/",
    },
  ];

  return (
    <div>
      <section className="my-work" id="work">
        <h2>My Work</h2>
        <p>A selection of my range of work</p>
        <Carousel items={items} />
      </section>
    </div>
  );
}
