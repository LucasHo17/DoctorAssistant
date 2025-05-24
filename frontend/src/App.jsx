import React, { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import { getDoctorReply } from "./gpt";
import { useSpeechSynthesis } from "react-speech-kit";



function App() {
  const [spokenText, setSpokenText] = useState("");
  const [doctorReply, setDoctorReply] = useState("");
  const [loading, setLoading] = useState(false);
  const { speak, cancel, speaking } = useSpeechSynthesis();

  const handleTranscript = async (text) => {
    setSpokenText(text);
    setLoading(true);
    const reply = await getDoctorReply(text);
    setDoctorReply(reply);
    setLoading(false);
    speak({ text: reply }); 
  }

  return (
    <div>
      <h1>🩺 AI Doctor Assistant</h1>
      <VoiceInput onTranscript={handleTranscript} />
      <hr />
      <p>
        <strong>
          You said:
        </strong> 
        {spokenText}
      </p>

      {loading ? (
        <p>Loading ...</p>
      ):(
        <p>
          <strong>Doctor's reply:</strong>
          {doctorReply}
        </p>
      )}

      {speaking && <button onClick={cancel}>🔇 Stop Speaking</button>}

    </div>
  );
}

export default App;
