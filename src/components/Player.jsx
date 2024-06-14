import React, {useEffect, useRef, useState} from 'react';
import Track from "./UI/track/track";
import '../styles/App.css'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Player = ({videoURL, playerRef, markers, setCurTime, pauses, setMarkerForHighlight, setCurrentSecTime, isPlaying, setIsPlaying, audios, setAudios, setChangeVideo, currentSession, wasAddedVideo, setWasAddedVideo, myAccess, setIsEditMode, isEditMode, relocationMarker}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(null);
    const [isInited, setIsInited] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [wasAdded, setWasAdded] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        if (isInited && (audios.length === 0 || wasAdded || !Cookies.get('OAuth-token'))) {
            setIsReady(true)
            setWasAdded(false)
        } else {
            setIsReady(false)
        }
    }, [currentSession, audios, isInited]);

    useEffect(() => {
        if (ref.current && !wasAddedVideo) {
            // eslint-disable-next-line
            playerRef.current = VK.VideoPlayer(ref.current);
        }
    }, [ref]);

    useEffect(() => {
        if (ref.current && wasAddedVideo) {
            // eslint-disable-next-line
            playerRef.current = VK.VideoPlayer(ref.current);
            setWasAddedVideo(false)
        }
    }, [wasAddedVideo]);

    const onPlayClick = () => {
        playerRef.current.play();
        setIsPlaying(true);
    };

    const onPauseClick = () => {
        playerRef.current.pause();
        setIsPlaying(false);
    };

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.on("inited", set_duration);
            playerRef.current.on("timeupdate", updateTime);
            playerRef.current.on("error", error);
            playerRef.current.on("started", onPlayClick);
            playerRef.current.on("resumed", onPlayClick);
            playerRef.current.on("paused", onPauseClick);
        }
    }, [playerRef]);

    const set_duration = () => {
        setDuration(playerRef.current.getDuration());
        setCurrentSecTime(playerRef.current.getCurrentTime());
        setCurrentTime(playerRef.current.getCurrentTime());
        setIsInited(true);
    }

    const updateTime = () => {
        setCurrentSecTime(playerRef.current.getCurrentTime());
        setCurrentTime(playerRef.current.getCurrentTime());
    }

    const error = () => {
        alert("Ошибка воспроизведения видео")
    }

    const change = () => {
        setChangeVideo(true)
        setIsPlaying(false);
    }

    return (
        <div style={{width: "100%", position: "relative", display: "flex", flexDirection: "column", zIndex: isEditMode ? "100" : undefined}}>
            {myAccess === "редактор" && !isEditMode
                ? <FontAwesomeIcon icon={faPen} size="sm"
                                   onClick={change}
                                   style={{
                                       padding: '10px',
                                       position: "absolute",
                                       alignSelf: "flex-end",
                                       width: "20px",
                                       height: "20px",
                                       backgroundColor: "#AFAFAF",
                                       borderRadius: "15px",
                                       cursor: "pointer"}}/>
                : <></>
            }


            <iframe
                ref={ref}
                src={videoURL}
                style={{borderRadius: "15px"}}
                width="500" height="300"
                allow="screen-wake-lock; encrypted-media; picture-in-picture; fullscreen" frameBorder="0"></iframe>

            <Track
                isPlaying={isPlaying}
                currentTime={currentTime}
                setIsEditMode={setIsEditMode}
                isInited={isInited}
                isEditMode={isEditMode}
                relocationMarker={isEditMode ? relocationMarker : undefined}
                playerRef={playerRef}
                setCurrentTime={setCurrentTime}
                markers={markers}
                setWasAdded={setWasAdded}
                currentSession={currentSession}
                pauses={pauses}
                audios={audios}
                setIsReady={setIsReady}
                isReady={isReady}
                setAudios={setAudios}
                duration={duration}
                setCurTime={setCurTime}
                setMarkerForHighlight={setMarkerForHighlight}
                onPlayClick={onPlayClick}
                onPauseClick={onPauseClick}
            />
        </div>
    );
    //
    // <ReactPlayer
    //     onReady={videoOnReady}
    //     onStart={onPlayPauseClick}
    //     onPause={onPlayPauseClick}
    //     onProgress={onProgress}
    //     className='react-player'
    //     url={videoURL}
    //     controls={false}
    //     width='100%'
    //     height='100%'
    // />
    //
    // <YouTube
    //     videoId={videoURL}
    //     onReady={videoOnReady}
    //     onPlay={onPlayPauseClick}
    //     onPause={onPlayPauseClick}
    //     onStateChange={onProgress}
    //     opts={{
    //         playerVars: {
    //             controls: 0, // выключили дорожку YouTube
    //             rel: 0, // выключили рекомендации YouTube
    //             autoplay: 1,
    //             origin: 'https://protocol.lavro.ru/',
    //         },
    //     }}
    //     style={{width: "100%"}}
    // />
};

export default Player;