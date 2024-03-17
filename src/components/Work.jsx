import Carousel from "./Carousel";
import "../styles/work.css";

export default function Work() {
  const items = [
    {
      image: "/LLM.jpeg",
      title: "LLM-NET",
      description:
        "An application that showcases the various models deployed by organisations and developers alike.",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/LMS.jpeg",
      title: "EDU HUB",
      description: "Description of Project 3",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/moodmap.jpeg",
      title: "MOODMAP",
      description: "Description of Project 2",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/moviememo.jpeg",
      title: "MOVIE MEMO",
      description: "Description of Project 3",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/plotforge.jpeg",
      title: "PLOTFORGE",
      description: "Description of Project 3",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/etch.jpeg",
      title: "ETCH-A-SKETCH",
      description: "Description of Project 3",
      link: "https://llm-net.vercel.app/",
    },
    {
      image: "/chromaShift.jpeg",
      title: "CHROMA SHIFT",
      description: "Description of Project 3",
      link: "https://llm-net.vercel.app/",
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
