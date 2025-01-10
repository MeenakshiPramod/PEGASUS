import React from 'react';
import TextInputOutput from '../components/textInput/TextInputOutput';
import ThemeSwitcher from "../components/themeSwitch/ThemeSwitcher"
import { ThemeProvider } from '../context/ThemeContext';
import Navbar  from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';
import content from "../utils/slides.json"
function App() {

  return (
    <ThemeProvider>
      <Navbar/>
      <ThemeSwitcher />

      <TextInputOutput  />
      <Slider content={content}/>
     
    </ThemeProvider>
  );
}

export default App;
