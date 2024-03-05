import React, { useState, useEffect, useRef } from 'react';

const ProgressBar = ({ isPlaying, setIsPlaying, duration = 30 }) => {
  const [progress, setProgress] = useState(0); // Progress as a percentage of the total duration
  const progressBarRef = useRef(null); // Reference to the progress bar for calculating width and position
  const [isDragging, setIsDragging] = useState(false); // Whether the seek bar is being dragged

  useEffect(() => {
    let intervalId;
    if (isPlaying && !isDragging) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + (100 / duration);
          if (newProgress >= 100) {
            // Instead of stopping, we reset the progress to start the loop over
            
          }
          return newProgress;
        });
      }, (duration / 100) * 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, isDragging, duration]);
  // Function to update the progress bar's progress based on the event's position
  const updateProgress = (clientX) => {
    const progressBar = progressBarRef.current;
    const { left, width } = progressBar.getBoundingClientRect();
    const newPosition = Math.min(Math.max(0, clientX - left), width);
    const newProgress = (newPosition / width) * 100;
    setProgress(newProgress);
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateProgress(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateProgress(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Attaching mousemove and mouseup to the whole document to allow for smoother dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={progressBarRef}
      style={{
        width: '100%',
        height: '10px',
        backgroundColor: 'red',
        position: 'relative',
        userSelect: 'none',
        marginTop:"20px"
      }}
      onMouseDown={handleMouseDown} // Initialize dragging on the progress bar
    >
      {/* This is the seek handle */}
      <div
        style={{
          position: 'absolute',
          left: `${progress}%`,
          zIndex:99999,
          top: 0,
          bottom: 0,
          width: '2px',
          height:"200px",
          backgroundColor: '#f7a9a9',
          cursor: 'pointer',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;
