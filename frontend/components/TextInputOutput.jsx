// TextInputOutput.jsx
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "./Text.css";

const TextInputOutput = () => {
  const { theme } = useTheme();
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
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
        your input:  {text}
        </p>
      </div>
    </div>
  );
};

export default TextInputOutput;
