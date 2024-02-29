import { useState, useEffect, useRef, useCallback } from 'react';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
  IoVolumeHigh,
  IoVolumeOff,
  IoVolumeLow,
} from 'react-icons/io5';

const Controls = ({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  tracks,
  trackIndex,
  setTrackIndex,
  setCurrentTrack,
  handleNext,
  isPlaying,
  setIsPlaying
}) => {
  
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);


  // Animation Frame Ref for smooth progress bar animation
  const playAnimationRef = useRef();

  // Function to update the progress bar and time
  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      progressBarRef.current.style.setProperty(
        '--range-progress',
        `${(currentTime / duration) * 100}%`
      );
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  // Effect to start or pause playback and initiate progress animation
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Playback started
        }).catch(error => {
          console.error('Playback failed:', error);
          setIsPlaying(false); // Handle error, possibly resetting state
        });
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, audioRef, repeat]);


  // Skip forward/backward 15 seconds
  const skipForward = () => audioRef.current.currentTime += 15;
  const skipBackward = () => audioRef.current.currentTime -= 15;

  // Handle track change to previous track
  const handlePrevious = () => {
    const newTrackIndex = trackIndex === 0 ? tracks.length - 1 : trackIndex - 1;
    setTrackIndex(newTrackIndex);
    setCurrentTrack(tracks[newTrackIndex]);
  };

  // Effect for volume control and muting
  useEffect(() => {
    audioRef.current.volume = volume / 100;
    audioRef.current.muted = muteVolume;
  }, [volume, muteVolume, audioRef]);

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}><IoPlaySkipBackSharp /></button>
        <button onClick={skipBackward}><IoPlayBackSharp /></button>
        <button onClick={togglePlayPause}>{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}</button>
        <button onClick={skipForward}><IoPlayForwardSharp /></button>
        <button onClick={handleNext}><IoPlaySkipForwardSharp /></button>
      </div>
      <div className="volume">
        <button onClick={() => setMuteVolume(prev => !prev)}>
          {muteVolume || volume < 5 ? <IoVolumeOff /> : volume < 40 ? <IoVolumeLow /> : <IoVolumeHigh />}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          style={{ background: `linear-gradient(to right, #f50 ${volume}%, #ccc ${volume}%)` }}
        />
      </div>
    </div>
  );
};

export default Controls;
