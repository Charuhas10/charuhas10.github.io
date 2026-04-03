import About from "./components/About";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Press from "./components/Press";
import ResumeSection from "./components/ResumeSection";
import Skills from "./components/Skills";
import TextBreakout from "./components/TextBreakout";
import Work from "./components/Work";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Press />
      <Skills />
      <Work />
      <TextBreakout />
      <ResumeSection />
      <Footer />
    </div>
  );
}
