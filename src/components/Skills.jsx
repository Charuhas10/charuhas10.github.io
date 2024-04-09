import "../styles/skills.css"; // Import CSS file for styling

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <h1 className="skills-title">Skills</h1>
      <p className="skills-subtitle">My technical level</p>
      <div className="skills-container">
        <div className="skill">
          <img src="/icons/c++.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/c.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/java.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/html.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/css.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/js.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/react.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/node.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/next.png" style={{ width: "auto" }}></img>
        </div>
        <div className="skill">
          <img src="/icons/git.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/mysql.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/mongo.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/prisma.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/postman.png"></img>
        </div>
        <div className="skill">
          <img src="/icons/tailwind.png"></img>
        </div>
      </div>
    </section>
  );
};

export default Skills;
