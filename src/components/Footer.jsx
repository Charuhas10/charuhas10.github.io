import "../styles/footer.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="footer" id="contact">
        <a href="mailto:charuhasreddybalam@gmail.com" className="mail-link">
          charuhasreddybalam@gmail.com
        </a>
        <ul className="social-list">
          <li>
            <a
              target="_blank"
              className="social-link"
              href="https://github.com/charuhas10"
            >
              <FaGithub />
              {/* <i className="fa-brands fa-github" aria-hidden="true"></i> */}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="social-link"
              href="https://www.linkedin.com/in/charuhas-reddy"
            >
              <FaLinkedin />
              {/* <i className="fa-brands fa-linkedin" aria-hidden="true"></i> */}
            </a>
          </li>
          <li>
            <a
              target="_blank"
              className="social-link"
              href="https://twitter.com/CharuhasReddy"
            >
              <FaTwitter />
              {/* <i className="fa-brands fa-twitter" aria-hidden="true"></i> */}
            </a>
          </li>
        </ul>
        <p className="copyright">© Charuhas Reddy Balam</p>
      </footer>
    </div>
  );
}
