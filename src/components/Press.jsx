import { motion } from "framer-motion";
import "../styles/press.css";

const articles = [
  {
    publication: "The Hindu",
    excerpt:
      "Google Cloud and Myntra create AI-powered Dream Room Inspirations experience for home decor shopping",
    url: "https://www.thehindu.com/sci-tech/technology/google-cloud-and-myntra-create-ai-powered-dream-room-inspirations-experience-for-home-decor-shopping/article69620450.ece",
  },
  {
    publication: "Business Standard",
    excerpt:
      "Myntra, Google Cloud's AI home decor feature: Dream Room Inspirations",
    url: "https://www.business-standard.com/companies/start-ups/myntra-google-cloud-ai-home-decor-dream-room-inspirations-125052601155_1.html",
  },
  {
    publication: "LinkedIn",
    excerpt:
      "Myntra taps Google Cloud's AI to elevate home decor shopping experience",
    url: "https://www.linkedin.com/posts/lakshminarayan-swaminathan-b294a114_myntra-taps-google-clouds-ai-to-elevate-activity-7333680454107119616-0qd4",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Press() {
  return (
    <section className="press" id="press">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Recognition</span>
          <h2 className="press-heading">Work That Made Headlines</h2>
          <p className="press-description">
            My work on{" "}
            <span className="press-highlight">Dream Room Inspirations</span> —
            an AI-powered home decor feature built with Google Cloud — was
            covered by major publications.
          </p>
        </motion.div>

        <motion.div
          className="press-cards"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {articles.map((article) => (
            <motion.a
              key={article.publication}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press-card"
              variants={cardVariant}
            >
              <span className="press-publication">{article.publication}</span>
              <p className="press-excerpt">{article.excerpt}</p>
              <span className="press-read">Read article →</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
