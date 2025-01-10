import React from 'react';
import { useTheme } from '../../context/ThemeContext'
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <button onClick={() => toggleTheme('light')} className="theme-button">Light Mode</button>
      <button onClick={() => toggleTheme('dark')} className="theme-button">Dark Mode</button>
      <button onClick={() => toggleTheme('blueGrey')} className="theme-button">Blue-Grey Mode</button>
      <button onClick={() => toggleTheme('yellowBlack')} className="theme-button">Yellow-Black Mode</button>
      <button onClick={() => toggleTheme('creamBrown')} className="theme-button">Cream-Brown Mode</button>
    </div>
  );
};

export default ThemeSwitcher;
