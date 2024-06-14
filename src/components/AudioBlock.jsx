import React, {useEffect, useRef, useState} from 'react';
import YandexAPI from "../API/yandexAPI";

const AudioBlock = ({audio, isPlayingVideo, isSeek, currentTime, videoDuration, audioDuration, setAudioDuration, leftShift, onLastAudioRendered, setProxies, proxy}) => {
    const audioRef = useRef(null)
    const [shift, setShift] = useState(null);
    const [proxyURL, setProxyURL] = useState(null);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false)

    // GET LINK AND SHIFT
    useEffect(() => {
        if (!proxyURL && !proxy) {
            getUploadedAudio()
        }
        setShift(((audio.shift ? audio.shift : leftShift) / videoDuration) * 100);
    }, [audio, proxy]);

    // ON LOAD DURATION
    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setAudioDuration(audioRef.current.duration / videoDuration * 100);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [videoDuration]);

    // CUR_TIME
    useEffect(() => {
        if (audioRef.current) {
            const newTime = currentTime - (audio.shift ? audio.shift : leftShift);
            if (Math.abs(audioRef.current.currentTime - newTime) > 0.5) {
                audioRef.current.currentTime = Math.max(0, newTime);
            }
        }
    }, [currentTime, audio, leftShift]);

    // PLAY OR PAUSE VIDEO
    useEffect(() => {
        if (audioRef.current && (audio.shift || leftShift)) {
            if (isPlayingVideo && currentTime >= (audio.shift ? audio.shift : leftShift)) {
                play();
            } else {
                pause();
            }
        }
    }, [isPlayingVideo, currentTime]);

    // SEEK TO SECOND
    useEffect(() => {
        if (audioRef.current && (audio.shift || leftShift)) {
            audioRef.current.currentTime = Math.max(0, currentTime - (audio.shift ? audio.shift : leftShift));
        }
    }, [isSeek]);

    const play = () => {
        if (!isPlayingAudio) {
            audioRef.current.play();
            setIsPlayingAudio(true);
        }
    }

    const pause = () => {
        if (isPlayingAudio) {
            audioRef.current.pause();
            setIsPlayingAudio(false);
        }
    }

    const getUploadedAudio = async () => {
        const r = await YandexAPI.getAudioLink(audio.audio_name);
        if (r.message) {
            alert(r.message);
        } else {
            proxyAudio(r.href);
        }
    }

    const proxyAudio = async (downloadedURL) => {
        const proxy = await YandexAPI.proxyAudio(downloadedURL);
        setProxyURL(proxy);
        setProxies(prevProxies => [...prevProxies, proxy]);

        if (onLastAudioRendered) {
            onLastAudioRendered(true);
        }
    }

    return (
        <div style={{position: "relative", zIndex: "0", display: audio.shift ? "block" : "none"}}>
            <div
                style={{
                    width: `${audioDuration}%`,
                    backgroundColor: "#AFAFAF",
                    opacity: "0.1",
                    position: "absolute",
                    height: "50px",
                    left: `${shift}%`,
                    pointerEvents: "none",
                }}></div>

            <audio
                style={{display: "none"}}
                ref={audioRef}
                src={proxyURL || proxy}
                controls>
            </audio>
        </div>
    )
};

export default AudioBlock;