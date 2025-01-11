import React, { useState } from 'react';
import './Slider.css';
import { useSpeech } from '../../context/SpeechContext';

const Slider = ({ content, onFinish }) => {
  const slides = content?.content || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [showContent, setShowContent] = useState(true);
  const { speak } = useSpeech();

  const generateImageUrl = (title) => {
    return `https://res.cloudinary.com/dxp115bum/image/upload/l_text:arial_50:${encodeURIComponent(title)},co_rgb:ffffff,g_south,y_30,b_white/v1676589641/sample.jpg`;
  };

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
      onFinish && onFinish();
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

  return (
    <div className="slider-container">
      <div className="animation-img">
        {/* Dynamically generated image for each title */}
        <img src={generateImageUrl(slides[currentIndex]?.title)} alt={slides[currentIndex]?.title} />
      </div>
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
