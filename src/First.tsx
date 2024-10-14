import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import bulb from '@/assets/bulb.svg'; // Import your bulb icon
import bedroom from '@/assets/bedroom.svg'; // Import your bedroom image
import hallwayImage from '@/assets/hallway.svg'; // Import your hallway image
import doorImage from '@/assets/door.svg'; // Import your door image
import clickSound from '@/assets/click.mp3'; // Import your click sound
import doorSound from '@/assets/door-click.mp3'; // Import your door click sound
import hauntedSound from '@/assets/haunted.mp3'; // Import your haunted sound
import { Link } from 'react-router-dom';

const First = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isBulbClicked, setIsBulbClicked] = useState(false);
  const [isDoorVisible, setIsDoorVisible] = useState(false);
  const [showClickDoorText, setShowClickDoorText] = useState(false);
  const [isHallwayVisible, setIsHallwayVisible] = useState(false);
  const [hallwayMessageIndex, setHallwayMessageIndex] = useState(0);
  const [isFinalHallwayMessageDisplayed, setIsFinalHallwayMessageDisplayed] = useState(false);

  const hauntedAudioRef = useRef(new Audio(hauntedSound)); // Reference for haunted sound

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
    setIsHallwayVisible(true); // Show hallway after clicking the door

    // Stop the haunted sound after 3 seconds
    hauntedAudioRef.current.play();
    setTimeout(() => {
        hauntedAudioRef.current.pause();
        hauntedAudioRef.current.currentTime = 0; // Reset the sound after 3 seconds
    }, 10000); // 3000 milliseconds = 3 seconds
};

const handleClick = () => {
    const audio = new Audio(clickSound);
    audio.play();
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
          setShowClickDoorText(true); // Show door click text after last bulb message
          setIsDoorVisible(true); // Show the door
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
        // Check if the last message has been displayed
        if (hallwayMessageIndex === hallwayMessages.length - 1) {
          setIsFinalHallwayMessageDisplayed(true); // Mark that the last hallway message has been displayed
        }
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

      {isLightOn && !isHallwayVisible && (
        <motion.div className="relative w-full h-full flex justify-center">
          <motion.img
            src={bedroom}
            alt="Bedroom"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="absolute text-4xl text-white mt-10 w-full text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            {/* Show the bulb messages */}
            {isBulbClicked &&
              (currentMessage >= initialMessages.length && currentMessage < initialMessages.length + bulbMessages.length) && (
                <div className="bg-black bg-opacity-60 w-full p-4">
                  <h1>{bulbMessages[currentMessage - initialMessages.length]}</h1>
                </div>
              )}
          </motion.div>

          {/* Show the door after bedroom messages */}
          {isDoorVisible && (
            <div className='flex flex-col gap-5'>
              <motion.img
                src={doorImage}
                alt="Door"
                className="absolute top-[20rem] left-1/2 transform -translate-x-1/2 w-32 h-64 cursor-pointer"
                animate={{ scale: [1, 1.05, 1] }} // Zoom in and out animation
                transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                onClick={handleDoorClick}
              />
              <h1 className='absolute top-[35rem] left-[48%] text-white text-3xl mt-2'>Click the door</h1>
            </div>
          )}
        </motion.div>
      )}

      {isHallwayVisible && (
        <motion.div className="relative w-full h-full flex justify-center">
          <motion.img
            src={hallwayImage}
            alt="Hallway"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Display hallway messages */}
          {hallwayMessageIndex < hallwayMessages.length && (
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

          {/* Ensure door is always visible in the hallway */}
          {isDoorVisible && (
            <motion.div
              className="absolute flex flex-col items-center bottom-20 left-1/2 transform -translate-x-1/2"
              onClick={handleClick}
            >
              <Link to="/bedroom" onClick={handleClick}>
                <motion.img
                  src={doorImage}
                  alt="Door"
                  className="w-24 h-40"
                  initial={{ opacity: 1 }}
                  animate={{ scale: [1, 1.05, 1] }} // Zoom in and out animation
                  transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
                />
              </Link>
              <h1 className='text-white text-2xl mt-2'>Click to continue</h1>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default First;
