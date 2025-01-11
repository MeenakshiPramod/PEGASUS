import React, { useState } from 'react';
import './Slider.css';
import { useSpeech } from '../../context/SpeechContext';

const Slider = ({ content, onFinish }) => {
  const slides = content; // Array of slides passed as props
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [showContent, setShowContent] = useState(true);
  const { speak } = useSpeech();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setDirection('right');
      setShowContent(false);
      setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setShowContent(true);
        speak(`${slides[nextIndex]?.title}. ${slides[nextIndex]?.description}`);
      }, 500);
    } else if (currentIndex === slides.length - 1) {
      onFinish && onFinish(); // Call onFinish when the last slide is reached
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection('left');
      setShowContent(false);
      setTimeout(() => {
        const prevIndex = currentIndex - 1;
        setCurrentIndex(prevIndex);
        setShowContent(true);
        speak(`${slides[prevIndex]?.title}. ${slides[prevIndex]?.description}`);
      }, 500);
    }
  };

  // Calculate progress percentage
  const progress = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className="slider-container">
      {/* Dynamic Image */}
      <div className="animation-img">
        <img src="/img.png" alt={slides[currentIndex]?.title} />
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Arrow Buttons */}
      <div className="arrow-buttons">
        <button onClick={handlePrev} className="arrow-btn">❮</button>
        <button onClick={handleNext} className="arrow-btn">❯</button>
      </div>

      {/* Slider Content */}
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
