import { BsMusicNoteBeamed } from 'react-icons/bs';

const DisplayTrack = ({
  tracklist,
  audioRef,
  setDuration,
  progressBarRef,
  
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
{console.log('tracklist', tracklist)}
  return (
    <>
    {tracklist?.length ? tracklist.map((item,index)=>{return(
      <div key={index}>
        <audio
          src={item?.url}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}

        />
        <div className="audio-info">
          <div className="audio-image">
            {item.thumbnail ? (
              <img src={item.thumbnail} alt="audio avatar" />
            ) : (
              <div className="icon-wrapper">
                <span className="audio-icon">
                  <BsMusicNoteBeamed />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )}) : null}
    </>
  );
};
export default DisplayTrack;
