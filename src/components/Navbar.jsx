import "../styles/navbar.css";

export default function Navbar() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const menu = document.getElementById("menu");

  navToggle.addEventListener("click", () => {
    document.body.classList.toggle("nav-open");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
    });
  });

  Array.from(document.getElementsByClassName("menu-item")).forEach(
    (item, index) => {
      item.onmouseover = () => {
        menu.dataset.activeIndex = index;
      };
    }
  );

  <header>
    <div className="logo">
      <a href="#home" className="img-link">
        <img src="assets/logo.png" alt="" />
      </a>
      <button className="nav-toggle" aria-label="toggle navigation">
        <span className="hamburger"></span>
      </button>

      <nav className="nav">
        <div id="menu">
          <div id="menu-items">
            <div className="menu-item">
              <a href="#home" className="nav-link">
                Home
              </a>
            </div>
            <div className="menu-item">
              <a href="#about" className="nav-link">
                About
              </a>
            </div>
            <div className="menu-item">
              <a href="#work" className="nav-link">
                Work
              </a>
            </div>
            <div className="menu-item">
              <a
                href="https://drive.google.com/file/d/1TQbmcCM9TdeLcDOQHzrkfiGywuSMQrIp/view?usp=sharing"
                className="nav-link"
                target="_blank"
              >
                Resume
              </a>
            </div>
            <div className="menu-item">
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </div>
          </div>
          <div id="menu-background-pattern"></div>
        </div>
      </nav>
    </div>
  </header>;
}
