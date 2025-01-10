import React, { useState } from 'react';
import './Slider.css';

const Slider = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(''); // Tracks direction of the transition
  const [showContent, setShowContent] = useState(true); // Controls visibility of content

  const slideArray = content.content; // Access the array inside the object

  // Handle next slide
  const handleNext = () => {
    if (currentIndex < slideArray.length - 1) {
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
    if (currentIndex > 0) {
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
      

      <div
        className={`slider-content ${direction === 'left' ? 'slide-left' : direction === 'right' ? 'slide-right' : ''} ${
          showContent ? 'show' : ''
        }`}
      >
        <h3>{slideArray[currentIndex]?.title}</h3>
        <p>{slideArray[currentIndex]?.description}</p>
      </div>
      <button onClick={handlePrev} className="arrow-btn">❮ prev</button>
      <button onClick={handleNext} className="arrow-btn">❯ next</button>
    </div>
  );
};

export default Slider;
