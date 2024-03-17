import "../styles/hero.css";

export default function Hero() {
  return (
    <div>
      <section className="intro" id="home">
        <h1 className="intro-title">
          Hi, I am <strong>Charuhas Reddy Balam</strong>
        </h1>
        <p className="intro-subtitle">Full-Stack Dev</p>
        <img src="/p3.jpg" alt="profile-image" className="profile-img" />
      </section>
    </div>
  );
}
