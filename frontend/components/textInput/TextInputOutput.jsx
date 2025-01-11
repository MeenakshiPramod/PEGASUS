import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./Text.css";

const TextInputOutput = ({ setTopic }) => {
  const { theme } = useTheme();
  const [text, setText] = useState("");    

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Submitted Text:", text);
     // Log the entered text
    setTopic(text);  // Pass the entered text to the parent component (App.js)
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
      <button 
        className="submit-btn" 
        type="button" 
        onClick={handleSubmit} // Attach the handleSubmit function
      >
        Enter
      </button>
    </div>
  );
};

export default TextInputOutput;
