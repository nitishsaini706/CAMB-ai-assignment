import React from 'react'
import {ListGroup} from 'react-bootstrap';

function UploadList({ tracks, currentTrack, setTracks, setCurrentTrack, trackIndex, setTrackIndex }) {
    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files).map(file => ({
            name: file.name,
            file: file,
            url: URL.createObjectURL(file)
        }));

        setTracks((prevTracks) => [...prevTracks, ...files]);

        if (!currentTrack) {
            setCurrentTrack(files[0]);
        }
        event.target.value = null;
    };
    console.log(trackIndex)
  return (
    <>
          <div className="audio-input">

              <input
                  className="upload"
                  id="audio-upload"
                  type="file"
                  accept="audio/*"
                  multiple
                  onChange={handleFileUpload}
              />
              <label htmlFor="audio-upload" className="upload-label">
                  <i className="fa fa-upload"></i> Upload Audio Files
              </label>
  
              <div >

          {tracks.length ? <ListGroup  as="ul">
              {tracks?.map((item,index)=>{
                  return (<ListGroup.Item className={`listing`} as="li" active={trackIndex == index} onClick={() => { setTrackIndex(index); setCurrentTrack(tracks[index]) }}>
                        {item.name}
                    </ListGroup.Item>)
                })}            
          </ListGroup> : null}
              </div>
    </div>
</>
  )
}

export default UploadList