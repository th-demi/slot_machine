import React, { useEffect } from 'react';
import SlotMachine from './SlotMachine'; // Adjust the path if necessary

const App = () => {
  useEffect(() => {
    // Create the audio object
    const audio = new Audio('assets/audio/pubg_music.mp3'); // Adjust path if necessary

    // Attempt to play the audio
    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Audio played successfully!');
      } catch (error) {
        console.log('Audio play failed: ', error);
      }
    };

    // Automatically try to play the audio on first click
    const handleUserInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleUserInteraction); // Remove event listener after the first click
    };

    // Add event listener for user interaction (click anywhere)
    window.addEventListener('click', handleUserInteraction);

    // Cleanup audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []); // Run this effect only once when the component is mounted

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="assets/pubg_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex items-center justify-center h-full">
        <SlotMachine />
      </div>
    </div>
  );
};

export default App;
