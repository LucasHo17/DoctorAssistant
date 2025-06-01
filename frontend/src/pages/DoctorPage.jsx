import React, { useRef, useEffect, useState } from 'react';
import './DoctorPage.css';
import { ImPhoneHangUp } from 'react-icons/im';
import { TiMicrophone, } from 'react-icons/ti';
import { FaMicrophoneSlash } from 'react-icons/fa6';
import { BsCameraVideoFill, BsCameraVideoOff, BsCursor } from 'react-icons/bs';
import { MdOutlineSubtitles,MdOutlineSubtitlesOff  } from 'react-icons/md';
import { askDoctor, doctorVoice } from '../api/gpt';
import { BiPlusMedical } from "react-icons/bi";
import { saveNote } from '../api/notes';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; 
import { CiLogout } from "react-icons/ci";
import "../assets/doctorAssistant.jpg"

const DoctorPage = () => {
  const userVideoRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechBufferRef = useRef("");

  const navigate = useNavigate();

  const [elapsedTime, setElapsedTime] = useState("00:00");
  const [isListening, setIsListening] = useState(false); // show mic icon and detect speech
  const [isCameraOn, setIsCameraOn] = useState(false); // show camera icon and toggle webcam
  const [isSubtitlesOn, setIsSubtitlesOn] = useState(true); // toggle subtitles on/off
  const [userSpeech, setUserSpeech] = useState(""); // store the latest speech input. Example: "You said: ..."
  const [micError, setMicError] = useState(null); // store microphone errors
  const [doctorReply, setDoctorReply] = useState("");
  const [isLoading, setIsLoading] = useState(false); // show loading spinner when doctor is thinking
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false); //ensure 1 reply, preven overlapping reply
  const [noteContent, setNoteContent] = useState(""); // store current note, and save note when call ends
  const [chatHistory, setChatHistory] = useState([{ role: "system", content: "You are a helpful AI doctor." }]); // for ai remember the whole context of conversation
  const [subtitle, setSubtitle] = useState("");         // displayed gradually
  const [fullDoctorReply, setFullDoctorReply] = useState(""); // stores full text
  const [isTalking, setIsTalking] = useState(false); // Controls Lottie animation

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const streamSubtitlesWhileSpeaking = (reply, audio) => {
    const chunks = reply.match(/[^.!?]+[.!?]?/g) || [reply];  // split by sentence-like chunks
    const interval = audio.duration / chunks.length;

    let i = 0;
    setTimeout(() => {
      const timer = setInterval(() => {
        setSubtitle(chunks[i]);
        i++;
        if (i >= chunks.length) clearInterval(timer);
      }, interval * 1000);
    }, 100); // convert seconds to milliseconds
  };

  const getUsername = () => {
    const token = localStorage.getItem("token");
    if (!token) return "guest";
    try {
      const decoded = jwtDecode(token);
      return decoded.username; 
    } catch (error) {
      console.error("Token decoding error:", error);
      return "guest"; 
    }
  }

  const username = getUsername()

  const toggleCamera = () => {
    if (!isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (userVideoRef.current) userVideoRef.current.srcObject = stream;
          setIsCameraOn(true);
        })
        .catch(err => console.error("Webcam error:", err));
    } else {
      const tracks = userVideoRef.current?.srcObject?.getTracks();
      tracks?.forEach(track => track.stop());
      userVideoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    if (!isListening) {
      try {
        setUserSpeech("");
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Speech recognition start error:", error);
      }
    } else {
      try {
        recognition.stop();
        setIsListening(false);
      } catch (error) {
        console.error("Speech recognition stop error:", error);
      }
    }
  };

  const handleDoctorInteraction = async (inputText) => {
    setIsProcessingSpeech(true);
    setIsLoading(true);
    setDoctorReply("");

    const newHistory = [
      ...chatHistory,
      { role: "user", content: inputText },
    ];

    try {
      const reply = await askDoctor(newHistory);
      setFullDoctorReply(reply);
      setSubtitle("");  // reset subtitles

      setChatHistory([...newHistory, { role: "assistant", content: reply }]);

      const audioUrl = await doctorVoice({ prompt: reply });
      const audio = new Audio(audioUrl);

      audio.onplay = () => {
        streamSubtitlesWhileSpeaking(reply, audio); 
      };

      audio.onended = () => {
        setIsListening(false);
        setSubtitle(""); 

      };

      audio.play();
    } catch (error) {
      console.error("Doctor interaction error:", error);
    }

    setIsLoading(false);
    setUserSpeech("");
    setIsProcessingSpeech(false);
  };


  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(" ");
        speechBufferRef.current = transcript.trim(); 
        setUserSpeech(transcript.trim());    
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setMicError(event.error);
      if (event.error === "no-speech") {
        alert("No speech detected. Please try speaking again.");
      }

      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      const bufferedText = speechBufferRef.current;  
      if (bufferedText && !isProcessingSpeech) {
        handleDoctorInteraction(bufferedText);
      }
    };
  }, [userSpeech, isProcessingSpeech]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - start) / 1000);
      const minutes = String(Math.floor(diff / 60)).padStart(2, '0');
      const seconds = String(diff % 60).padStart(2, '0');
      setElapsedTime(`${minutes}:${seconds}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (micError) {
      const timeout = setTimeout(() => setMicError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [micError]);

  return (
    <div className="doctor-page">
      <div className="video-section">
        <div className="doctor-camera">
          <img src="https://res.cloudinary.com/di2j2vkbt/image/upload/v1748674458/doctorAsisstant_nc1gsr.jpg" alt="Doctor Assistant" className="doctor-image" />        </div>
        {isLoading && (
          <div className="doctor-loading-spinner">
            <div className="spinner" />
            <p>Doctor is thinking...</p>
          </div>
        )}
        <div className='username-display'>{username}</div>
        <video className="user-camera" autoPlay muted playsInline ref={userVideoRef} />
        {isSubtitlesOn && subtitle  && (
          <div className="subtitle">
            <strong>Doctor:</strong> {subtitle}
          </div>
        )}
        <div className="controls-bar">
          <button className="control-button" onClick={toggleCamera}>
            {isCameraOn ? <BsCameraVideoFill /> : <BsCameraVideoOff />}
          </button>
          <button className="control-button" onClick={toggleListening}>
            {isListening ? <TiMicrophone /> : <FaMicrophoneSlash />}
          </button>
          <button className="control-button" onClick={() => setIsSubtitlesOn(prev => !prev)}>
            {isSubtitlesOn ? <MdOutlineSubtitles /> : <MdOutlineSubtitlesOff />}
          </button>
          <button
            className="control-button leave"
            onClick={async () => {
              if (noteContent.trim()) {
                try {
                  await saveNote(noteContent);
                  console.log("Note saved successfully.");
                } catch (err) {
                  console.error("Error saving note:", err);
                }
              }
              navigate("/"); // go to notes page after saving
            }}
          >
            <ImPhoneHangUp />
          </button>
        </div>
        {userSpeech && (
          <div className="speech-preview">
            <strong>You said:</strong> {userSpeech}
          </div>
        )}
        <div className="meeting-timer">{elapsedTime}</div>
        {micError && (
          <div className="mic-error">
            <strong>Microphone Error:</strong> {micError}
          </div>
        )}
      </div>

      <div className="notes-section">
        <button onClick={handleLogout} className="logout-button2" >
          <CiLogout style={{marginRight:"0.5rem", fontSize:"2rem"}}/>
          Logout
        </button>
        <h3>
          <BiPlusMedical style={{marginRight:"0.5rem", marginTop:"0.5rem", color:"red"}}/>
          Your Record
        </h3>
        <textarea className="note-input" placeholder="Type here..." value={noteContent} onChange={(e) => setNoteContent(e.target.value)}></textarea>
      </div>
    </div>
  );
};

export default DoctorPage;
