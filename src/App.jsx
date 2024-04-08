import About from "./components/About";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Skills from "./components/Skills";
import Work from "./components/Work";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Footer />
    </div>
  );
}
