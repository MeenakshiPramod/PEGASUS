import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(''); // Tracks direction of the transition
  const [showContent, setShowContent] = useState(true); // Controls visibility of content

  // Handle next slide
  const handleNext = () => {
    if (currentIndex < content.length - 1) {
      setDirection('right'); // Indicate a right slide
      setShowContent(false); // Hide content during transition
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setShowContent(true); // Show content after transition
      }, 500); // Timeout to match the transition duration
    }
  };

  // Handle previous slide
  const handlePrev = () => {
    console.log("left")
    if (currentIndex > 0) {
      console.log("left:", currentIndex); // Logging currentIndex
      setDirection('left'); // Indicate a left slide
      setShowContent(false); // Hide content during transition
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setShowContent(true); // Show content after transition
      }, 500); // Timeout to match the transition duration
    }
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrev} className="arrow-btn">❮prev</button>

      <div className={`slider-content ${direction === 'left' ? 'slide-left' : direction === 'right' ? 'slide-right' : ''} ${showContent ? 'show' : ''}`}>
        <p>{content[currentIndex]}</p>
      </div>

      <button onClick={handleNext} className="arrow-btn">❯</button>
    </div>
  );
};

export default Slider;
