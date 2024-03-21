import Carousel from "./Carousel";
import "../styles/work.css";

export default function Work() {
  const items = [
    {
      image: "/LLM.jpeg",
      title: "LLM-NET",
      description:
        "LLM Net is a dynamic application that showcases the various Large Language Models deployed by organisations and developers alike. Built using NEXT.JS and MongoDB, this platform offers seamless switching between light and dark themes, ensuring a comfortable viewing experience for all users.  ",
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
        "MovieMemo is a sleek and user-friendly web application designed to help Movie enthusiasts keep track of the films they want to watch. The application is built using HTML, CSS, JavaScript and Firebase.",
      link: "https://movie-memo.netlify.app/",
    },
    {
      image: "/plotforge.jpeg",
      title: "PLOTFORGE",
      description: "Description of Project 3",
      link: "This is a Web Application that allows users to create interesting Movie plots with a title and an AI generated poster by just simply entering an Outline of the plot by leveraging the OpenAI API. The application is built using ReactJS and Flask Backend.",
    },
    {
      image: "/etch.jpeg",
      title: "ETCH-A-SKETCH",
      description:
        "The Etch-a-Sketch project is a web-based implementation of the classic toy that allows users to draw and create artwork using their mouse. It provides a nostalgic experience while embracing modern web technologies. The project is built using HTML, CSS, and JavaScript.",
      link: "https://charuhas10.github.io/Etch-a-Sketch/",
    },
    {
      image: "/chromaShift.jpeg",
      title: "CHROMA SHIFT",
      description:
        "ChromaShift is a simple web application that allows users to input any color in hex code and provides them with the option to lighten or darken the color. The application is built using HTML, CSS, and JavaScript.",
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
