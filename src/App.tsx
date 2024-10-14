import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import bulb from '@/assets/bulb.svg'; // Import your bulb icon
import bedroom from '@/assets/bedroom.svg'; // Import your bedroom image
import hallwayImage from '@/assets/hallway.svg'; // Import your hallway image
import doorImage from '@/assets/door.svg'; // Import your door image
import clickSound from '@/assets/click.mp3'; // Import your click sound
import doorSound from '@/assets/door-click.mp3'; // Import your door click sound
import hauntedSound from '@/assets/haunted.mp3'; // Import your haunted sound

const App = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isBulbClicked, setIsBulbClicked] = useState(false);
  const [isDoorVisible, setIsDoorVisible] = useState(false);
  const [showClickDoorText, setShowClickDoorText] = useState(false);
  const [isHallwayVisible, setIsHallwayVisible] = useState(false);
  const [isDoorClicked, setIsDoorClicked] = useState(false);
  const [hallwayMessageIndex, setHallwayMessageIndex] = useState(0);

  // Messages to be displayed
  const initialMessages = [
    "Hi Miara!",
    "Why is it so dark here?",
    "Love, can you help me turn on the lights?"
  ];

  const bulbMessages = [
    "Okay! Why is it so empty here?",
    "You know what, let's move outside.",
    "Let's see if anyone's over there.."
  ];

  const hallwayMessages = [
    "Hey!",
    "Maybe it's a bit late to move in the hallway.",
    "Things are creepy here.",
    "I think we should go back inside."
  ];

  const turnOnLight = () => {
    setIsLightOn(true);
    setIsBulbClicked(true);
    const audio = new Audio(clickSound);
    audio.play();
  };

  const handleDoorClick = () => {
    const audio = new Audio(doorSound);
    audio.play();
    setIsDoorVisible(true);
    setIsHallwayVisible(true); // Show hallway after clicking the door
    setIsDoorClicked(true); // Set door clicked state
  };

  useEffect(() => {
    if (currentMessage < initialMessages.length - 1 && !isBulbClicked) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentMessage, isBulbClicked]);

  useEffect(() => {
    if (isBulbClicked) {
      const timer = setTimeout(() => {
        if (currentMessage < initialMessages.length + bulbMessages.length - 1) {
          setCurrentMessage((prev) => prev + 1);
        }
        if (currentMessage === initialMessages.length + bulbMessages.length - 1) {
          setIsDoorVisible(true);
          setShowClickDoorText(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isBulbClicked, currentMessage]);

  // Update hallway message index when hallway is visible
  useEffect(() => {
    if (isHallwayVisible && hallwayMessageIndex < hallwayMessages.length) {
      const timer = setTimeout(() => {
        setHallwayMessageIndex((prev) => prev + 1);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isHallwayVisible, hallwayMessageIndex]);

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center transition-all duration-1000 ${
        isLightOn ? 'bg-black' : 'bg-black'
      }`}
    >
      {currentMessage < initialMessages.length && !isBulbClicked && (
        <motion.h1
          key={currentMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="text-4xl text-white mb-4 text-center"
        >
          {initialMessages[currentMessage]}
        </motion.h1>
      )}

      {currentMessage === initialMessages.length - 1 && !isLightOn && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6, duration: 1.5 }}
          className="cursor-pointer flex flex-col justify-center items-center gap-4"
          onClick={turnOnLight}
        >
          <motion.img
            src={bulb}
            alt="Light Bulb"
            className="w-40 h-40 mt-10"
            animate={{
              scale: [1, 1.05, 1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
          />
          <span className='text-white'>Click the bulb</span>
        </motion.div>
      )}

      {isLightOn && (
        <div className="relative w-full h-full flex justify-center">
          {isHallwayVisible ? (
            <motion.img
              src={hallwayImage}
              alt="Hallway"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          ) : (
            <motion.img
              src={bedroom}
              alt="Bedroom"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            />
          )}

          {!isHallwayVisible && isBulbClicked && currentMessage >= initialMessages.length && (
            <motion.div
              className="absolute text-4xl text-white mt-10 w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="bg-black bg-opacity-60 w-full p-4">
                <h1>
                  {currentMessage - initialMessages.length === 0
                    ? bulbMessages[0]
                    : currentMessage - initialMessages.length === 1
                    ? bulbMessages[1]
                    : bulbMessages[2]}
                </h1>
              </div>
            </motion.div>
          )}

          {/* Show door and "Click the door" text together */}
          {!isHallwayVisible && isBulbClicked && currentMessage >= initialMessages.length + bulbMessages.length - 1 && (
            <motion.div
              className="absolute flex flex-col items-center justify-center"
              onClick={handleDoorClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <motion.img
                src={doorImage}
                alt="Door"
                className="w-32 h-64"
                animate={{ scale: [1, 1.05, 1] }} // Zoom in and out animation
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              />
              <h1 className='text-white text-3xl mt-2'>Click the door</h1>
            </motion.div>
          )}

          {/* Show hallway messages */}
          {isHallwayVisible && hallwayMessageIndex < hallwayMessages.length && (
            <motion.div
              className="absolute text-4xl text-white mt-10 w-full text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <div className="bg-black bg-opacity-60 w-full p-4">
                <h1>{hallwayMessages[hallwayMessageIndex]}</h1>
              </div>
            </motion.div>
          )}

          {isHallwayVisible && isBulbClicked && currentMessage >= initialMessages.length + hallwayMessages.length - 1 && (
            <motion.div
              className="absolute flex flex-col items-center justify-center"
              onClick={handleDoorClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <motion.img
                src={doorImage}
                alt="Door"
                className="w-32 h-64"
                animate={{ scale: [1, 1.05, 1] }} // Zoom in and out animation
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
              />
              <h1 className='text-white text-3xl mt-2'>Click the door</h1>
            </motion.div>
          )}

          
        </div>
      )}
    </div>
  );
};

export default App;
