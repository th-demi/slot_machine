import React from 'react';
import SlotMachine from './SlotMachine'; // Adjust the path if necessary

const App = () => {
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
