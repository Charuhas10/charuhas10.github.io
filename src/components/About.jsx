import "../styles/about.css";

export default function About() {
  return (
    <div>
      <section className="about-me" id="about">
        <h2 className="about-title">Who am I</h2>
        <p className="about-subtitle">A developer looking to learn new stuff</p>

        {/* eslint-disable */}
        <div className="about-me-body">
          <p>
            Hey, I am Charuhas Reddy Balam, a Full-Stack Developer building
            fast, responsive and beautiful Applications. As a self-motivated
            individual, I like embracing fresh challenges and learn new stuff.
            I am currently working as a Software Developer at Myntra, and work with React Native and GoLang.
          </p>
          <p>
            When I'm not coding, you'll often find me on the tennis court,
            enjoying a friendly match or reading a book. And if I happen to be
            engrossed in a screen, chances are I'm gaming or indulging in some
            movie marathons.
          </p>
          <p>Let's connect and build something awesome together.</p>
        </div>
      </section>
    </div>
  );
}
