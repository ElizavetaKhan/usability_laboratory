import React, { useEffect, useRef, useState } from 'react';
import st from "./UI/track/track.module.css";
import ProjectService from "../API/ProjectService";

const AddAudio = ({ audio, duration, audioDuration, leftShift, setLeftShift, setAudios, wasAdded}) => {
    const trackRef = useRef(null);
    const thumbRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = (e) => {
        if (trackRef.current && thumbRef.current && isDragging) {
            const trackRect = trackRef.current.getBoundingClientRect();
            const thumbWidth = thumbRef.current.getBoundingClientRect().width;
            let newLeft = e.clientX - trackRect.left - thumbWidth / 2;

            // Ограничение смещения в пределах дорожки
            newLeft = Math.max(0, Math.min(newLeft, trackRect.width - thumbWidth));

            const newLeftInSec = (newLeft / (trackRect.width - thumbWidth)) * duration;
            setLeftShift(newLeftInSec.toFixed(0));
        }
    };

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const sendShift = async (event) => {
        if (event.key === 'Enter') {
            const r = await ProjectService.setAudioShift(audio.audio_name, leftShift)
            if (r) {
                alert(r.ERROR);
            } else {
                setAudios((prevAudios) =>
                    prevAudios.map((i) =>
                        i.audio_name === audio.audio_name ? { ...i, shift: leftShift } : i
                    )
                );
                wasAdded(true);
            }
        }
    }

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('keydown', sendShift);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('keydown', sendShift);
        };
    }, [isDragging]);

    useEffect(() => {
        if (thumbRef.current) {
            thumbRef.current.style.width = `${audioDuration}%`;
        }
    }, [audio, audioDuration, duration]);

    return (
        <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <div
                ref={trackRef}
                className={st.additional}>

                <div
                    ref={thumbRef}
                    className={st.thumb}
                    style={{
                        left: `${(leftShift / duration) * 100}%`
                    }}
                    onMouseDown={handleMouseDown}
                    tabIndex={0}>
                </div>

                <div className={st.info}>
                    Синхронизация аудио с видео. Подтвердите сдвиг нажатием Enter
                </div>
            </div>

            <input
                type="text"
                name="leftShift"
                value={leftShift}
                onChange={(e) => setLeftShift(parseFloat(e.target.value))}
            >
            </input>
        </div>

    );
};

export default AddAudio;
