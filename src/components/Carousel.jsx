import { useState } from "react";
import "../styles/carousel.css";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevItem = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevItem} className="prev-btn">
        &#10094;
      </button>
      <button onClick={nextItem} className="next-btn">
        &#10095;
      </button>
      <div
        className="carousel-items"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* eslint-disable */}
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
