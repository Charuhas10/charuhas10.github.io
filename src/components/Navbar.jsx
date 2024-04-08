import { useEffect } from "react";
import "../styles/navbar.css";

export default function Navbar() {
  useEffect(() => {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelectorAll(".nav-link");
    const menu = document.getElementById("menu");

    const toggleNav = () => {
      document.body.classList.toggle("nav-open");
    };
    navToggle.addEventListener("click", toggleNav);

    const removeNavOpen = () => {
      document.body.classList.remove("nav-open");
    };
    navLinks.forEach((link) => {
      link.addEventListener("click", removeNavOpen);
    });

    const menuItems = Array.from(document.getElementsByClassName("menu-item"));
    menuItems.forEach((item, index) => {
      item.onmouseover = () => {
        menu.dataset.activeIndex = index;
      };
    });

    // Cleanup function to remove event listeners
    return () => {
      navToggle.removeEventListener("click", toggleNav);
      navLinks.forEach((link) => {
        link.removeEventListener("click", removeNavOpen);
      });
      // Note: Removing the 'onmouseover' event from menuItems is not strictly necessary
      // as those elements are part of the component and will be removed anyway when the component unmounts.
    };
  }, []);

  return (
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
                  href="https://drive.google.com/file/d/1EgYZWQcj2PtgXDmiTGW9LXCojT3Md6yy/view?usp=drive_link"
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
    </header>
  );
}
