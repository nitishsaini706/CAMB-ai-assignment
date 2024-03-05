import { GiSkullCrossedBones } from "react-icons/gi";
import React, { useState, useEffect, useRef } from "react";

const Draggable = ({ track, onRemove, index, audioRefs }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragX, setDragX] = useState(0);
    const trackRef = useRef(null);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        // OffsetX gives you the position of the mouse relative to the track element
        trackRef.current.offsetX = e.clientX - trackRef.current.getBoundingClientRect().left;
        if (audioRefs.current[index].current) {
            audioRefs.current[index].current.currentTime -= e.clientX

        }
        e.preventDefault(); // Prevent default to avoid text selection, etc.
    };

    const handleMouseMove = (e) => {
        console.log("mousemove")

        if (isDragging) {
            const rect = trackRef.current.getBoundingClientRect();
            // Calculate how much the mouse has moved relative to the width of the progress bar
            const mouseMove = e.clientX - rect.left;
            const progressBarWidth = rect.width;
            const movementPercentage = (mouseMove / progressBarWidth) * 100;

            // Here you would calculate the new start time based on the movement percentage
            // and the total duration that your progress bar represents
            const newStart = track.start + movementPercentage * (30 / 100);
            const newX = e.clientX - trackRef.current.offsetX;
            console.log(audioRefs)
            // if (audioRefs.current[index].current) {
            //     audioRefs.current[index].current.currentTime += newStart

            // }
            // track.current.duration -=newX;
            // Update the dragX state, and use onDrag to update the parent component if necessary
            setDragX(newX);
            // onDrag(track.id, newX);
        }
    };

    const handleMouseUp = () => {

        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div
            style={{
                cursor: 'grab',
                userSelect: 'none',
                position: 'relative',
                left: `${dragX}px`, display: "flex", justifyContent: "space-between", width: `${(track.end - track.start) / 30 * 100}%`, backgroundColor: `${track.backgroundColor}`, borderRadius: "20px", padding: "10px", border: "2px solid white", marginBottom: "5px", color: "white"
            }}

            ref={trackRef}
            onMouseDown={handleMouseDown}

        >
            {/* Track content */}
            {track.name}
            <GiSkullCrossedBones onClick={() => onRemove(track.id)} />
        </div>
    );
};

export default Draggable;