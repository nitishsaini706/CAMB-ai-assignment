import { useRef, useState } from 'react';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import UploadList from './UploadList';

const AudioPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    const nextTrackIndex = trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1;
    setTrackIndex(nextTrackIndex);
    setCurrentTrack(tracks[nextTrackIndex]);
  };

  return (
    <>
    <div className='main'>

      <UploadList {...{ currentTrack, setTracks, setCurrentTrack, trackIndex, tracks, setTrackIndex }} />
     {tracks.length ?  <div className="audio-player">
        <div className="inner">
          {currentTrack && (
            <DisplayTrack
              {...{
                currentTrack,
                audioRef,
                setDuration,
                progressBarRef,
                handleNext,
              }}
            />
          )}
         <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          /> 
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
        </div>
      </div> : null}
    </div>
    </>
  );
};

export default AudioPlayer;
