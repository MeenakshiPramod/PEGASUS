import { useContext,createContext } from "react";

const speechContext=createContext();
export const SpeechProvider=({children})=>{

    const speak=(text)=>{
        if(!text) return;
        if('speechSynthesis' in window){
            const utterance=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance)
        }
        else{
            alert('Sorry, your browser does not support text-to-speech.');
        }
    }

    return(<speechContext.Provider value={{speak}}>
  {children}
    </speechContext.Provider>)
}

export const useSpeech=()=>useContext(speechContext)