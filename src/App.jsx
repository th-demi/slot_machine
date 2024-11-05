import React, { useEffect } from 'react';
import SlotMachine from './SlotMachine';

const App = () => {
  useEffect(() => {
    const audio = new Audio('assets/audio/pubg_music.mp3');

    const playAudio = async () => {
      try {
        await audio.play();
        console.log('Audio played successfully!');
      } catch (error) {
        console.log('Audio play failed: ', error);
      }
    };

    const handleUserInteraction = () => {
      playAudio();
      window.removeEventListener('click', handleUserInteraction);
    };

    window.addEventListener('click', handleUserInteraction);

    return () => {
      audio.pause();
      audio.currentTime = 0;
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
      >
        <source src="assets/videos/pubg_background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex items-center justify-center h-full">
        <SlotMachine />
      </div>
    </div>
  );
};

export default App;
