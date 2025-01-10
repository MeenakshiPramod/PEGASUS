import React from 'react';
import TextInputOutput from '../components/TextInputOutput';
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ThemeProvider } from '../context/ThemeContext';
import Navbar  from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';

function App() {
  const contentArray = [
    'Content 1: This is the first content.',
    'Content 2: This is the second content.',
    'Content 3: This is the third content.',
    'Content 4: This is the fourth content.',
    'Content 5: This is the fifth content.',
    'Content 6: This is the sixth content.',
    'Content 7: This is the seventh content.',
    'Content 8: This is the eighth content.',
    'Content 9: This is the ninth content.',
    'Content 10: This is the tenth content.'
  ];
  return (
    <ThemeProvider>
      <Navbar/>
      <ThemeSwitcher />

      <TextInputOutput  />
      <Slider content={contentArray}/>
     
    </ThemeProvider>
  );
}

export default App;
