import React, { useEffect, useState } from 'react';
import TextInputOutput from '../components/textInput/TextInputOutput';
import ThemeSwitcher from "../components/themeSwitch/ThemeSwitcher";
import { ThemeProvider } from '../context/ThemeContext';
import Navbar from '../components/navbar/Navbar';
import Slider from '../components/slider/Slider';
import Quiz from "../components/Quiz/Quiz";
import { SpeechProvider } from '../context/SpeechContext';
import axios from "axios";

function App() {
  const [showQuiz, setShowQuiz] = useState(false); // State to track when to show Quiz
  const [notes, setNotes] = useState("");  // State to store notes
  const [loading, setLoading] = useState(true);  // Loading state to show until data is fetched
  const [quiz, setQuiz] = useState();
  const [topic, setTopic] = useState("Basics of Computer Science"); // State to manage the topic
   const [url,setUrl]=useState("")

  const gifUrls = {
    array: "/assets/array.gif.mp4",
    linkedlist: "/assets/linkedlist.gif",
    queue: "/assets/queue.gif.mp4",
    stack: "/assets/stack.gif.mp4",
  };
   const getGifUrl = () => {
    const topicKey = topic.toLowerCase().replace(/\s/g, ''); // Clean topic for matching keys
    return gifUrls[topicKey] || gifUrls["array"]; // Default to "array.gif" if no match
  };
   
  // Function to fetch notes from the Flask API
  const handleNotes = async () => {
    try {
      const result = await axios.post("http://127.0.0.1:5000/generate-notes", {
        topic: topic,
      });
      if (result.data && result.data.notes) {
        let Exp = result.data.notes;
        Exp = Exp.split("**");
        let test = {}; // Initialize an empty object to store the title-description pairs
        for (let i = 1; i < Exp.length; i += 2) {
          test[i] = {
            title: Exp[i].trim(), // Title of the module
            description: Exp[i + 1].trim(), // Description of the module
          };
        }
        setNotes(test);  // Store the notes in the state
      } else {
        console.error("No notes returned in the response.");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);  // Stop loading once the request is complete
    }
  };

  const handleQuiz = async () => {
    const result = await axios.post("http://127.0.0.1:5000/generate-quiz", {
      topic: topic,
    });

    let res = result.data.quiz;
    const cleanResponse = res.slice(8, -4).trim();
   
    setQuiz(cleanResponse);
  };

  // Fetch notes and quiz on component mount
  useEffect(() => {
    handleNotes();
    handleQuiz();
  
  }, [topic]);

  // Convert notes object to an array of modules
  const notesArray = Object.values(notes);

  return (
    <ThemeProvider>
      <SpeechProvider>
        <Navbar />
        <ThemeSwitcher />
        <TextInputOutput setTopic={setTopic} />  {/* Pass the setTopic function */}
        
        {/* Display loading message while fetching */}
        {loading && <div>Loading notes...</div>}
        
        {/* Display notes */}
        {!loading && notes && (
          <Slider content={notesArray} onFinish={() => setShowQuiz(true) }/>
        )}
        {showQuiz && <Quiz content={quiz} />}
      </SpeechProvider>
    </ThemeProvider>
  );
}

export default App;
