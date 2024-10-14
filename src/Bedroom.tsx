import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'; // Import the confetti library
import bedroomImage from '@/assets/bedroom.svg'; // Bedroom image
import doorImage from '@/assets/gift.svg'; // Door image for the end
import balloonLeftImage from '@/assets/balloon-left.png'; // Left balloon image
import balloonRightImage from '@/assets/balloon-right.png'; // Right balloon image
import girlfriendImage from '@/assets/miara.png';
import music from '@/assets/happy-birthday.mp3'; // Import the music file

const Bedroom = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showDoor, setShowDoor] = useState(false);
  const [showBirthdayMessages, setShowBirthdayMessages] = useState(false);
  const [showGirlfriendImage, setShowGirlfriendImage] = useState(false);
  
  const messages = [
    "Wow! That was something weird.",
    "Hey look! There's a gift for you..",
    "C'mon, let's open it and see what's in there!"
  ];

  const birthdayMessages = [
    "Happy Birthday, Love!",
    "You make every day brighter.",
    "I'm so grateful for you!",
    "Here's to you and all your dreams.",
    "Let's celebrate your special day!",
    "--Angelo Guiao"
  ];

  useEffect(() => {
    // Show the first message immediately
    setShowMessage(true);

    const messageTimer = setInterval(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowDoor(true);
        clearInterval(messageTimer);
      }
    }, 3000); // Switch messages every 3 seconds

    return () => clearInterval(messageTimer);
  }, [currentMessageIndex, messages.length]);

  const handleDoorClick = () => {
    // Play music when the door is clicked
    const audio = new Audio(music);
    audio.play(); // Start playing the music

    setShowBirthdayMessages(true); // Show birthday messages
    setShowDoor(false); // Hide the door after clicking
    setTimeout(() => {
      setShowGirlfriendImage(true); // Show girlfriend's image after the messages
    }, birthdayMessages.length * 2000); // Delay based on the number of messages
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center bg-blue-900 relative">
      {showBirthdayMessages && <Confetti />} {/* Show confetti when birthday message is displayed */}

      <motion.img
        src={bedroomImage}
        alt="Bedroom"
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center text-white">
        {showMessage && currentMessageIndex < messages.length && (
          <motion.h1
            className="text-4xl mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessageIndex]}
          </motion.h1>
        )}

        {showBirthdayMessages && (
          <div>
            {birthdayMessages.map((msg, index) => (
              <motion.h2
                key={index}
                className="text-5xl mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1, delay: index * 2 }} // Delays for each message
              >
                {msg}
              </motion.h2>
            ))}
          </div>
        )}

        {/* Show girlfriend's picture after birthday messages */}
        {showGirlfriendImage && (
            <div className='flex justify-center'>
                <motion.img
                  src={girlfriendImage}
                  alt="Girlfriend"
                  className="mt-10 rounded-full w-40 h-40" // Adjust size as needed
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                />
            </div>
        )}
      </div>

      {showDoor && (
        <div className='text-white'>
          <motion.img
            src={doorImage}
            alt="Door"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer w-32 h-auto" // Adjust the width as needed
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={handleDoorClick} // Call the handler on click
          />
          <h3>Click the gift</h3>
        </div>
      )}

      {/* Balloons on left and right */}
      {showBirthdayMessages && (
        <>
          <motion.img
            src={balloonLeftImage}
            alt="Left Balloon"
            className="absolute top-20 left-5 w-20" // Adjust size and position as needed
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={balloonRightImage}
            alt="Right Balloon"
            className="absolute top-20 right-5 w-20" // Adjust size and position as needed
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </>
      )}
    </div>
  );
};

export default Bedroom;
