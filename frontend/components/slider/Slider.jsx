import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ content, onFinish }) => {
  const slides = content?.content || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(''); // Tracks direction of the transition
  const [showContent, setShowContent] = useState(true); // Controls visibility of content

  // Handle next slide
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setDirection('right');
      setShowContent(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowContent(true);
      }, 500);
    } else if (currentIndex === slides.length - 1) {
      // Call onFinish when the last slide is reached
      onFinish && onFinish();
    }
  };

  // Handle previous slide
  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setShowContent(false);
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setShowContent(true);
      }, 500);
    }
  };

  return (
    <div className="slider-container">
      <div className="arrow-buttons">
        <button onClick={handlePrev} className="arrow-btn">❮</button>
        <button onClick={handleNext} className="arrow-btn">❯</button>
      </div>

      <div
        className={`slider-content ${
          direction === 'left'
            ? 'slide-left'
            : direction === 'right'
            ? 'slide-right'
            : ''
        } ${showContent ? 'show' : ''}`}
      >
        <h3>{slides[currentIndex]?.title}</h3>
        <p>{slides[currentIndex]?.description}</p>
      </div>
    </div>
  );
};

export default Slider;
