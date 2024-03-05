import { useState, useEffect, useRef, useCallback } from 'react';
import {
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

const Controls = ({
  audioRef,
  startTime,
  endTime,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
  currentTrack
}) => {
  

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
    console.log(audioRef)
  }, []);


  // Animation Frame Ref for smooth progress bar animation
  // const playAnimationRef = useRef();

  // Effect to start or pause playback and initiate progress animation
  // useEffect(() => {
  //   if (audioRef.current && isPlaying) {
  //     console.log(audioRef)
  //     playAnimationRef.current = requestAnimationFrame(audioRef.currentTime);
  //     const playTimeout = setTimeout(() => {
  //       audioRef.current.play();
  //     }, startTime * 1000); // startTime in milliseconds

  //     // Stop the audio at the designated end time
  //     const stopTimeout = setTimeout(() => {
  //       audioRef.current.pause();
  //       cancelAnimationFrame(playAnimationRef.current);
  //       audioRef.current.currentTime = 0;
  //     }, endTime * 1000); // endTime in milliseconds

  //     // Cleanup timeouts on unmount
  //     return () => {
  //       clearTimeout(playTimeout);
  //       clearTimeout(stopTimeout);
  //       audioRef.current.pause();
  //     };
  //   }
  // }, [isPlaying, audioRef, startTime, endTime]);


  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button style={{color:"white"}} onClick={togglePlayPause}>{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}</button>
      </div>
    </div>
  );
};

export default Controls;
