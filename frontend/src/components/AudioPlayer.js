import React, { useRef, useState, useEffect, createRef, useCallback } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import Draggable from './Draggable';
import ProgressBar from './ProgressBar';
import UploadList from './UploadList';
import {
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';
import { GiSkullCrossedBones } from "react-icons/gi";

const AudioPlayer = () => {
  const [trackList, setTrackList] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const progressBarRef = useRef();
  const audioRefs = useRef([]);
  const playAnimationRef = useRef();

  const tracks = [
    { id: 1, name: 'cinematic.mp3', type: 'audio', src: '/assets/cinematic.mp3', start: 0, end: 12, backgroundColor:"#6C7D47" },
    { id: 2, name: 'drums.mp3', type: 'audio', src: '/assets/drums.mp3', start: 0, end: 18, backgroundColor: "#0E79B2" },
    { id: 3, name: 'tone.mp3', type: 'audio', src: '/assets/tone.mp3', start: 0, end: 10, backgroundColor: "#BF1363)" },

  ];

  useEffect(() => {
    // Map each track to a new ref
    audioRefs.current = trackList.map((_, index) => audioRefs.current[index] ?? React.createRef());

  }, [trackList]);

  useEffect(() => {
    // This effect could handle individual play/pause based on timing
    trackList?.forEach((track, index) => {
      const audio = audioRefs.current[index].current;
      if (audio) {
          if (isPlaying) {
            audio.play();
          }
          else{

            audio.pause();
          }
      }
    });
  }, [trackList, isPlaying]);

  const togglePlayPause = useCallback(() => {
    // Toggle the play state
    setIsPlaying(prev => !prev);

    // Pause all tracks
    audioRefs.current.forEach((ref) => {
      if (ref.current && !ref.current.paused) {
        ref.current.pause();
      }
    });
  }, []);
  const removeTrack = useCallback((id) => {
    setTrackList(currentTrackList => currentTrackList.filter(track => track.id !== id));
    audioRefs.current = audioRefs.current.filter((ref, index) => trackList[index].id !== id);
  }, []);
console.log("trackList",audioRefs);
  return (
    <>
    <div className='main'>
      <UploadList {...{  tracks, setTrackList,audioRefs }} />
      <div style={{marginTop:"20px"}}>

        {isPlaying ? <IoPauseSharp onClick={togglePlayPause} /> : <IoPlaySharp onClick={togglePlayPause} />}
      </div>

        <div className="audio-player">
          <div className="inner">
            <ProgressBar
              {...{isPlaying,setIsPlaying }}
            />
          </div>
        </div> 
      
        {trackList.map((track, index) => (
          <div style={{width:"100%",backgroundColor:"grey",padding:'10px',border:"2px solid"}}>
            <Draggable
              key={track.id}
              track={track}
              index={index}
              audioRefs={audioRefs}
              isPlaying={isPlaying}
              setTrackList={setTrackList}
              // onDrag={(trackId, newX) => {
              //   if(audioRefs.current[index].current)
              //     audioRefs.current[index].current.currentTime += newX
              //   // Handle the drag here. You can update the state or do something else.
              //   console.log(newX);
              // }}
              onRemove={(trackId) => removeTrack(trackId)}
            />
            <audio
              key={track.id}
              src={track.src}
              ref={audioRefs.current[index]}

              onLoadedMetadata={() => {
                if (audioRefs.current[index] && audioRefs.current[index].current) {
                  // const duration = audioRefs.current[index].current.duration;
                  // if (duration) {
                  //   setDuration(duration);
                  // }
                }
              }}
            />
          {/* <div style={{display:"flex",justifyContent:"space-between",width:`${(track.end-track.start)/30 * 100}%` , backgroundColor:`${track.backgroundColor}`,borderRadius:"20px",padding:"10px",border:"2px solid white",marginBottom:"5px",color:"white"}}>
            <span>{track.name.split(".")[0]}</span>
            <GiSkullCrossedBones size={20}onClick={() => removeTrack(track.id)}/>
          <audio
            key={track.id}
            src={track.src}
            ref={audioRefs.current[index]}
            
            onLoadedMetadata={() => {
              if (audioRefs.current[index] && audioRefs.current[index].current) {
                // const duration = audioRefs.current[index].current.duration;
                // if (duration) {
                //   setDuration(duration);
                // }
              }
            }}
          />
          </div> */}
            </div>
        ))}
    
    </div>
    </>
  );
};

export default AudioPlayer;
