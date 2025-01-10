import React, { useState } from 'react';
import './quiz.css'; // Optional: Add CSS for styling

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      question: "What is the purpose of a variable in programming?",
      options: ["To store data", "To perform calculations", "To display output", "To define functions"],
      correctAnswer: "To store data",
    },
    {
      question: "Which programming language is primarily used for web development?",
      options: ["Python", "JavaScript", "C++", "Java"],
      correctAnswer: "JavaScript",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "HyperText Markup Language",
        "Hyperlink Text Markup Language",
        "Home Tool Markup Language",
        "HyperTool Markup Language",
      ],
      correctAnswer: "HyperText Markup Language",
    },
    {
      question: "Which of the following is not a programming language?",
      options: ["Ruby", "Python", "HTML", "Java"],
      correctAnswer: "HTML",
    },
    {
      question: "What is the output of 2 + '2' in JavaScript?",
      options: ["22", "4", "Error", "undefined"],
      correctAnswer: "22",
    },
    {
      question: "Which CSS property is used to change text color?",
      options: ["color", "font-size", "background", "text-align"],
      correctAnswer: "color",
    },
    {
      question: "What is the function of a loop in programming?",
      options: [
        "To repeat a block of code",
        "To handle errors",
        "To store data",
        "To define variables",
      ],
      correctAnswer: "To repeat a block of code",
    },
    {
      question: "Which of the following is a JavaScript framework?",
      options: ["Django", "Flask", "React", "Laravel"],
      correctAnswer: "React",
    },
    {
      question: "What does the ‘const’ keyword in JavaScript do?",
      options: [
        "Declares a block-scoped variable",
        "Defines a constant that cannot be reassigned",
        "Creates a global variable",
        "Declares a function",
      ],
      correctAnswer: "Defines a constant that cannot be reassigned",
    },
    {
      question: "Which tag is used to define an unordered list in HTML?",
      options: ["<ul>", "<ol>", "<li>", "<list>"],
      correctAnswer: "<ul>",
    },
  ];

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score}/{questions.length}</h2>
          <p>Great job! Keep learning and improving!</p>
        </div>
      ) : (
        <div className="question-section">
          <h3>Question {currentQuestionIndex + 1}/{questions.length}</h3>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="options-container">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className="option-btn"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
