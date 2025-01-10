import React from 'react';
import TextInputOutput from '../components/TextInputOutput';
import ThemeSwitcher from '../components/ThemeSwitcher';
import { ThemeProvider } from '../context/ThemeContext';


function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      <TextInputOutput />
    </ThemeProvider>
  );
}

export default App;
