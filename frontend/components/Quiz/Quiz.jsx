import React, { useState } from 'react';
import './quiz.css'; // Import your CSS file

const Quiz = ({ content }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Make sure content is passed correctly
  // const questions = [
  //   {
  //     "question": "What is a computer?",
  //     "options": [
  //       "A machine that can draw pictures",
  //       "A machine that can do math",
  //       "A machine that can talk to you",
  //       "A machine that can follow instructions"
  //     ],
  //     "correct_answer": "A machine that can follow instructions"
  //   },
  //   {
  //     "question": "What is a program?",
  //     "options": [
  //       "A set of instructions for a computer",
  //       "A game you play on a computer",
  //       "A picture you make on a computer",
  //       "A song you listen to on a computer"
  //     ],
  //     "correct_answer": "A set of instructions for a computer"
  //   },
  //   {
  //     "question": "What is a file?",
  //     "options": [
  //       "A collection of information stored on a computer",
  //       "A program that runs on a computer",
  //       "A picture you can see on a computer",
  //       "A sound you can hear on a computer"
  //     ],
  //     "correct_answer": "A collection of information stored on a computer"
  //   },
  //   {
  //     "question": "What is the Internet?",
  //     "options": [
  //       "A way to connect computers",
  //       "A place to buy things",
  //       "A place to watch videos",
  //       "A place to play games"
  //     ],
  //     "correct_answer": "A way to connect computers"
  //   }
  // ]
  const questions=JSON.parse(content);
console.log(typeof questions,"::",)
  // Handle answer selection
  const handleAnswer = (selectedOption) => {
    // Check if the selected option is correct
    if (selectedOption === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    // Go to next question or show score
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
