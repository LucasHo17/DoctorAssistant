import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export default function VoiceInput({onTranscript}){
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const handleStart = () => {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
    };
    const handleStop = () => {
        SpeechRecognition.stopListening();
        onTranscript(transcript);
    }

    if (!browserSupportsSpeechRecognition){
        return <p>Browser does not support voice recognition</p>
    }

    return (
        <div>
            <button onClick={handleStart}>🎙️Start speaking</button>
            <button onClick={handleStop}>🛑Stop</button>
            <p>
                <strong>
                    Transcript:
                </strong>
                {transcript}
            </p>

            <p>{listening ? "Listening... ":"Not listening"}</p>
        </div>
    )
}