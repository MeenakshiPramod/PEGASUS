import React from 'react';
import TextInputOutput from '../components/TextInputOutput';
import ThemeSwitcher from "../components/ThemeSwitcher";
import { ThemeProvider } from '../context/ThemeContext';
import Navbar  from '../components/navbar/Navbar';
import './App.css';


function App() {
  return (
    <ThemeProvider>
      <Navbar/>
      <ThemeSwitcher />
      <TextInputOutput />
    </ThemeProvider>
  );
}

export default App;
