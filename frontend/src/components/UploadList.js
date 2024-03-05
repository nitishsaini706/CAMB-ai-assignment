import React from 'react'
import {ListGroup} from 'react-bootstrap';

function UploadList({ tracks, setTrackList }) {
   
    
  return (
    <>    

          {tracks.length ? <ListGroup  as="ul">
              {tracks?.map((item,index)=>{
                  return (<ListGroup.Item className={`listing-${index}`} as="li" onClick={() => { setTrackList((prev)=> [...prev,item]); }}>
                        {item.name}
                    </ListGroup.Item>)
                })}            
          </ListGroup> : null}
              
    
</>
  )
}

export default UploadList