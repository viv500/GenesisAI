'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SpeechToText } from '@/components/speech-to-text';

export default function Landing() {
  const [showForm, setShowForm] = useState(false);
  const [businessInfo, setBusinessInfo] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usingSpeech, setUsingSpeech] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLaunch = () => {
    setShowForm(true);
  };

  const handleTextCapture = (text: string) => {
    setBusinessInfo(text);
    setUsingSpeech(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log('Business Info submitted:', businessInfo);
    
    try {
      const response = await fetch('http://localhost:8000/api/speech-to-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: businessInfo }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from backend:', data);
      
      // Wait for 2 seconds to show loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push('/canvas');
      
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-2xl mb-4"
        >
          Understanding Your Business...
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-4xl font-bold text-white mb-8">
        Welcome to Stella AI
      </h1>
      
      {!showForm ? (
        <button
          onClick={handleLaunch}
          className="px-6 py-3 bg-black text-white border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors duration-300"
        >
          Launch your Business
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            {usingSpeech ? (
              <SpeechToText onTextCapture={handleTextCapture} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-white text-lg">
                    Tell Stella what you currently know about your business
                  </label>
                  <p className="text-gray-400 text-sm">
                    This could include Industry, Products/Services, Revenue Model, Business Goals etc.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <textarea
                      value={businessInfo}
                      onChange={(e) => setBusinessInfo(e.target.value)}
                      className="w-full h-40 p-3 rounded-lg bg-gray-100 text-black border border-gray-300 focus:border-white focus:ring-1 focus:ring-white"
                      placeholder="Describe your business..."
                    />
                    <button
                      type="button"
                      onClick={() => setUsingSpeech(true)}
                      className="self-end text-blue-400 hover:text-blue-300 text-sm flex items-center"
                    >
                      Or use voice input
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-300"
                >
                  Submit
                </button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

