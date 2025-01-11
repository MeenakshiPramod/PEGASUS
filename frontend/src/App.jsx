import React from 'react';
import TextInputOutput from '../components/textInput/TextInputOutput';
import ThemeSwitcher from "../components/themeSwitch/ThemeSwitcher";
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';
import Quiz from "../components/Quiz/Quiz"
import content from "../utils/slides.json";
import { SpeechProvider } from '../context/SpeechContext';
import './App.css'
function App() {
  const [showQuiz, setShowQuiz] = React.useState(false); // State to track when to show Quiz

  return (
    <ThemeProvider>
      <SpeechProvider>
      <Navbar />
      <ThemeSwitcher />
      <TextInputOutput />
      
      {!showQuiz ? (
        <Slider content={content} onFinish={() => setShowQuiz(true)} />
      ) : (
        <Quiz />
      )}
      </SpeechProvider>
    </ThemeProvider>
  );
}

export default App;
