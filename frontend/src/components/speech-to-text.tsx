import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Edit } from 'lucide-react';

interface SpeechToTextProps {
  onTextCapture: (text: string) => void;
}

// Define types for the Speech Recognition API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

export function SpeechToText({ onTextCapture }: SpeechToTextProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [speechSupported, setSpeechSupported] = useState(true);

  // Check if speech recognition is supported
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && 
        !('SpeechRecognition' in window)) {
      setSpeechSupported(false);
    }
  }, []);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let currentTranscript = '';
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      // Only stop if we're still supposed to be listening
      // This handles the case where the browser stops listening automatically
      if (isListening) {
        recognition.start();
      }
    };

    recognition.start();

    // Store recognition instance to stop it later
    window.recognitionInstance = recognition;
  };

  const stopListening = () => {
    setIsListening(false);
    if (window.recognitionInstance) {
      window.recognitionInstance.stop();
    }
    
    // Set the edited text to the transcript for editing
    setEditedText(transcript);
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
    onTextCapture(editedText);
  };

  if (!speechSupported) {
    return (
      <div className="text-red-500 mb-4">
        Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!isListening && !isEditing && (
        <div className="flex flex-col items-center">
          <p className="text-white mb-4">Click the microphone to start your business pitch</p>
          <button
            onClick={startListening}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Mic className="h-8 w-8 text-black" />
          </button>
        </div>
      )}

      {isListening && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg">Recording your pitch...</h3>
            <button
              onClick={stopListening}
              className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <MicOff className="h-4 w-4 mr-2" />
              Stop Recording
            </button>
          </div>
          
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
              className="absolute -top-3 -left-3 w-full h-full border-2 border-red-500 rounded-lg"
            />
            <div className="bg-gray-800 text-white p-4 rounded-lg min-h-[100px] relative z-10">
              {transcript || "Start speaking..."}
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg">Edit your pitch</h3>
            <button
              onClick={handleEditComplete}
              className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Edit className="h-4 w-4 mr-2" />
              Finish Editing
            </button>
          </div>
          
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-40 p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-white focus:ring-1 focus:ring-white"
            placeholder="Edit your business pitch..."
          />
        </div>
      )}
    </div>
  );
}

// Add these TypeScript declarations for the Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    recognitionInstance: any;
  }
}
