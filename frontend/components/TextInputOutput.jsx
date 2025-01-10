import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./Text.css";

const TextInputOutput = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");    

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="container" style={{ borderColor: theme.text }}>
      <div className="input-area">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type here..."
          className="text-input"
          style={{ color: theme.text, background: theme.background }}
        />
      </div>
      <div className="output-area">
        <p className="text-output" style={{ color: theme.text }}>
          Your input: {text}
        </p>
      </div>
      <button 
        onClick={handleSubmit} 
        className="submit-button"
        style={{ backgroundColor: theme.text, color: theme.background }}
      >
        Submit
      </button>
    </div>
  );
};

export default TextInputOutput;
