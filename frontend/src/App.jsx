import React, { useEffect, useState } from 'react';
import TextInputOutput from '../components/textInput/TextInputOutput';
import ThemeSwitcher from "../components/themeSwitch/ThemeSwitcher";
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';
import Quiz from "../components/Quiz/Quiz"
import content from "../utils/slides.json";
import { SpeechProvider } from '../context/SpeechContext';
import axios from "axios";

function App() {
  const [showQuiz, setShowQuiz] = useState(false); // State to track when to show Quiz
  const [notes, setNotes] = useState("");  // State to store notes
  const [loading, setLoading] = useState(true);  // Loading state to show until data is fetched

  // Function to fetch notes from the Flask API
  const handleNotes = async () => {
    try {
      const result = await axios.post("http://127.0.0.1:5000/generate-notes", {
        topic: "Basics of Computer Science",
      });

      if (result.data && result.data.notes) {
        const slicedNotes = result.data.notes.slice();  // Properly handle slicing
        console.log(slicedNotes);
        setNotes(slicedNotes);  // Store the notes in the state
      } else {
        console.error("No notes returned in the response.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);  // Stop loading once the request is complete
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    handleNotes();
  }, []);

  return (
    <ThemeProvider>
      <SpeechProvider>
        <Navbar />
        <ThemeSwitcher />
        <TextInputOutput />
        
        {/* Display loading message while fetching */}
        {loading && <div>Loading notes...</div>}
        
        {/* Display notes */}
        {!loading && notes && <div>{notes}</div>}  {/* Displaying fetched notes */}

        {!showQuiz ? (
          <Slider content={content} onFinish={() => setShowQuiz(true)} />
        ) : (
          <Quiz />
        )}
      </SpeechProvider>
    </ThemeProvider>
  );
}

export default App;
