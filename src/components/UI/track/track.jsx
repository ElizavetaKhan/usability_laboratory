import React, {useEffect, useState} from 'react';
import st from './track.module.css'
import pause from "../../images/pause.png";
import startPause from "../../images/startPause.png";
import back from "../../images/back5.png";
import next from "../../images/next5.png";
import Label from "../../Label";
import Pause from "../../pause";
import Cookies from "js-cookie";
import AudioBlock from "../../AudioBlock";
import AddAudio from "../../addAudio";
import Loader from "../loader/loader";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Track = ({isPlaying, currentTime, playerRef, setCurrentTime, markers, duration, setCurTime, pauses, setMarkerForHighlight, onPauseClick, onPlayClick, audios, isInited, setAudios, isReady, setIsReady, currentSession, setWasAdded, setIsEditMode, isEditMode, relocationMarker}) => {
    const [total, setTotal] = useState('00:00:00');
    const [cur, setCur] = useState('00:00:00');
    const [isSeek, setIsSeek] = useState(false);
    const [proxies, setProxies] = useState([]);

    const [audioDuration, setAudioDuration] = useState(0);
    const [leftShift, setLeftShift] = useState(0);

    useEffect(() => {
        const hour1 = Math.floor(currentTime / 3600);
        const min1 = Math.floor((currentTime % 3600) / 60);
        const sec1 = Math.floor(currentTime % 60);

        const hour2 = Math.floor(duration / 3600);
        const min2 = Math.floor((duration % 3600) / 60);
        const sec2 = Math.floor(duration % 60);

        setCurTime(`${hour1 < 10 ? '0' : ''}${hour1}:${min1 < 10 ? '0' : ''}${min1}:${sec1 < 10 ? '0' : ''}${sec1}`);
        setCur(`${hour1 < 10 ? '0' : ''}${hour1}:${min1 < 10 ? '0' : ''}${min1}:${sec1 < 10 ? '0' : ''}${sec1}`);
        setTotal(`${hour2 < 10 ? '0' : ''}${hour2}:${min2 < 10 ? '0' : ''}${min2}:${sec2 < 10 ? '0' : ''}${sec2}`);
    },[duration,currentTime])

    useEffect(() => {
        setIsSeek(false);
        setLeftShift(0);
        setAudioDuration(0);
        setTotal('00:00:00');
        setCur('00:00:00')
    }, [currentSession]);

    useEffect(() => {
        setProxies([]);
    }, [audios]);

    // перемещаем по времени
    const onSeek = (time) => {
        playerRef.current.seek(time);
        setCurrentTime(time);
        setIsSeek(!isSeek);
    };

    const back5 = () => {
        playerRef.current.seek(currentTime-15);
        setCurrentTime(currentTime-15);
    }

    const next5 = () => {
        playerRef.current.seek(currentTime+15);
        setCurrentTime(currentTime+15);
    }

    const styleInput = {
        ...({borderRadius: "10px"}),
        ...(isEditMode ? { border: '0.2px solid' } : {})
    };

    return (
        <>
            <div className={st.track} style={{display: isReady ? "flex" : "none"}}>
                <div style={{width: "80%", overflow: "hidden"}}>
                    {duration === 0
                        ? <></>

                        : <>
                            {markers.map((mark) => {
                                if (mark.secTime <= duration) {
                                    return <Label label={mark} duration={duration}
                                                  setMarkerForHighlight={setMarkerForHighlight} relocationMarker={relocationMarker}/>
                                }
                                return null;
                            })}

                            {pauses.map((pause) => {
                                if (pause.end < duration) {
                                    return <Pause pause={pause} duration={duration}/>
                                }
                                return null;
                            })}

                            {audios.length !== 0 && Cookies.get('OAuth-token') && isInited
                                ? audios.map((audio, index) => {
                                    const isLastElement = index === audios.length - 1;

                                    return (
                                        <AudioBlock
                                            audio={audio}
                                            proxy={proxies[index]}
                                            setProxies={setProxies}
                                            videoDuration={duration}
                                            isSeek={isSeek}
                                            setAudioDuration={setAudioDuration}
                                            audioDuration={audioDuration}
                                            leftShift={leftShift}
                                            currentTime={currentTime}
                                            isPlayingVideo={isPlaying}
                                            onLastAudioRendered={isLastElement ? setIsReady : null}
                                            key={index + currentSession.id_session}/>
                                    )
                                })
                                : <></>
                            }
                        </>
                    }

                    <input className={st.trackkk} step="0.01" type="range" min="0" max="100"
                           style={styleInput}
                           value={(currentTime / duration) * 100}
                           onChange={(e) => onSeek((e.target.value / 100) * duration)}/>

                    <FontAwesomeIcon icon={faPen} size="sm"
                                     onClick={() => setIsEditMode(!isEditMode)}
                                     style={{
                                         padding: '10px',
                                         position: "absolute",
                                         alignSelf: "flex-end",
                                         width: "15px",
                                         marginTop: "8px",
                                         height: "15px",
                                         cursor: "pointer"}}/>

                    {audioDuration
                        ? <>
                            {audios.map((audio) => {
                                if (!audio.shift) {
                                    return <AddAudio
                                                audio={audio}
                                                setAudios={setAudios}
                                                duration={duration}
                                                leftShift={leftShift}
                                                setLeftShift={setLeftShift}
                                                wasAdded={setWasAdded}
                                                audioDuration={audioDuration}/>
                                }
                                return null;
                            })}
                        </>
                        : <></>
                    }
                </div>

                <div className={st.buttonsAndTime}>
                    <div>
                        <button
                            onClick={back5}
                            style={{backgroundImage: `url(${back})`, height: "18px"}}>
                        </button>

                        <button
                            onClick={isPlaying ? onPauseClick : onPlayClick}
                            style={{backgroundImage: `url(${isPlaying ? pause : startPause})`, height: "25px"}}>
                        </button>

                        <button
                            onClick={next5}
                            style={{backgroundImage: `url(${next})`, height: "18px"}}>
                        </button>
                    </div>

                    <h4>
                        {cur} / {total}
                    </h4>
                </div>
            </div>
            {isReady
                ? <></>
                : <div style={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
                    <Loader/>
                </div>
            }
        </>
    );
};

export default Track;