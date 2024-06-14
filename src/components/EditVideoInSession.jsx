import React, {useEffect, useRef, useState} from 'react';
import '../styles/EditVideo.css'
import MarkerTypesList from "../components/MarkerTypesList";
import MarkersList from "../components/MarkersList";
import ProjectService from "../API/ProjectService";
import Loader from "./UI/loader/loader";
import {useFetching} from "../hooks/useFetching";
import VideoVkUpload from "./VideoVkUpload";
import AudioYandexUpload from "./AudioYandexUpload";
import Player from "./Player";

const EditVideoInSession = ({markers, setMarkers, markerTypes, currentSession, setGoToEdit, taskList, goToEdit, setPauses, myAccess, pauses, setCurrentSession}) => {
    const [filt, setFilter] = useState(null);
    const [current_color, setColor] = useState("#E1E1E1");

    const [current_type, setType] = useState(null);
    const [taskName, setTaskName] = useState(null);
    const [isAllMarkers, setIsAllMarkers] = useState(true);
    const [audios, setAudios] = useState([]);
    const [changeVideo, setChangeVideo] = useState(false);

    const [currentSecTime, setCurrentSecTime] = useState(0);
    const [currentTimeInProject, setCurrentTime] = useState('00:00:00');
    const [markerForHighlight, setMarkerForHighlight] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [wasAddedVideo, setWasAddedVideo] = useState(false)

    const playerRef = useRef(null);

    const [isEditMode, setIsEditMode] = useState(false)

    // ЗАГРУЗКА МАРКЕРОВ У КОНКРЕТНОЙ СЕССИИ
    const [fetchMarkers, isLoadingMarkers, errorMark] = useFetching(async () => {
        if (currentSession) {
            const r = await ProjectService.getAllMarkersAndPauses(currentSession.id_session)
            if (!r[0].ERROR) {
                const [res1, res2, res3] = r;
                setMarkers(res1);
                setPauses(res2);
            } else {
                alert(r[0].ERROR);
            }
        }
    })

    // ЗАПОЛНЕНИЕ НОВОГО МАРКЕРА
    const templateForAddMarker = () => {
        const temp = {time: currentTimeInProject, secTime: currentSecTime, color: current_color, id_type: current_type, id_marker: Date.now().toString()};
        setFilter([...filt, temp]);
    }

    // обновление маркеров при изменении данной сессии
    useEffect(() => {
        // если перешли в другую сессию
        if (currentSession.videoURL && goToEdit) {
            setGoToEdit(false);
        }

        if (currentSession.videoURL) {
            fetchMarkers();
        }

        getAllAudio();
        setChangeVideo(false);
        setColor("#E1E1E1")
        setFilter(false);
        setType(false);
        setIsAllMarkers(true);
        setCurrentSecTime(0);
        setCurrentTime('00:00:00');

    }, [currentSession])

    // ПОЛУЧЕНИЕ ВСЕХ АУДИО В СЕССИИ
    const getAllAudio = async () => {
        const r = await ProjectService.getAllAudio(currentSession.id_session);
        if (!r.ERROR) {
            setAudios([]);
            r.forEach((file) => {
                setAudios(prevAudios => [...prevAudios, file]);
            });
        } else {
            alert(r.ERROR);
        }
    }

    // ОТПРАВКА МАРКЕРА В БД И ПОЛУЧЕНИЕ НОВОГО id
    const addMarkerToDatabase = async (comment, marker) => {
        // Отправить данные и получить созданный id
        const r = await ProjectService.addMarker(comment, marker.id_type, marker.time, currentSession.id_session)
        if (!r.ERROR) {
            setFilter((prevMarkers) =>
                prevMarkers.map((i) =>
                    i.id_marker === marker.id_marker ? { ...i, id_marker: r.id, comment: comment } : i
                )
            );
            setMarkers([...markers, {
                id_marker: r.id,
                comment: comment,
                time: marker.time,
                secTime: marker.secTime,
                color: marker.color,
                id_type: marker.id_type,
            }]);

        } else {
            setMarkers(markers.filter(p => p.id_marker !== marker.id_marker));
            alert(r.ERROR);
        }
    }

    // ФИЛЬТР ПО МАРКЕРАМ
    const chooseType = (color, type) => {
        setType(type);
        setColor(color);
        setFilter(markers.filter(p => p.id_type === type));
        setIsAllMarkers(false)
    }

    // ПРИ ИЗМЕНЕНИИ МАССИВА МАРКЕРОВ ОБНОВЛЯЕМ ФИЛЬТР
    useEffect(() => {
        if (current_type) {
            setFilter(markers.filter(p => p.id_type === current_type));
        }
    },[markers])

    // ЕСЛИ ПОКАЗ ВСЕХ МАРКЕРОВ – ФИЛЬТР ОБНУЛЯЕМ
    useEffect(() => {
        if (isAllMarkers) {
            setFilter(null);
            setType(null);
            setColor("#E1E1E1");
        }
    },[isAllMarkers])

    // ПРИ ИЗМЕНЕНИИ МАССИВА МАРКЕРОВ ЧЕКАЕМ НАЛИЧИЕ ЗАДАНИЯ(1 ТИП МАРКЕРА)
    useEffect(() => {
        if (taskName) {
            addMarkerToDatabase(`Начало задания «${taskName}»`, filt[filt.length - 1]);
            setTaskName(null);
        }
    }, [filt]);

    // перемещение к метке
    const moveToTime = (marker) => {
        if (playerRef.current) {
            // перемещение к времени
            playerRef.current.seek(marker.secTime);
        }
    }

    const relocationMarker = async (marker) => {
        const r = await ProjectService.relocateMarker(marker.id_marker, currentSecTime)
        if (r) {
            alert(r.ERROR);
        } else {
            setMarkers((prevMarkers) =>
                prevMarkers.map((mark) => {
                    if (mark.id_marker === marker.id_marker) {
                        return {
                            ...mark,
                            time: currentTimeInProject,
                            secTime: currentSecTime
                        };
                    }
                    return mark;
                })
            );
        }
    };

    return (
        <div className="edit">
            <div className="overlay"
                 style={{
                     marginTop: "-100px",
                     display: isEditMode
                        ? "block"
                        : "none"}}>
            </div>

            <div className="markersFromDB" style={{zIndex: "1000"}}>
                <MarkerTypesList
                    markerTypes={markerTypes}
                    chooseType={chooseType}
                    setIsAllMarkers={setIsAllMarkers}
                    type="1"
                />

                <div style={{
                    backgroundColor: `${current_color}40`,
                    height: "500px",
                    borderRadius: "0 20px 20px 20px",
                    padding: "35px 30px",
                    overflow: "hidden auto"
                }}>
                    {isLoadingMarkers
                        ? <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
                            <Loader/>
                        </div>

                        : <MarkersList
                            isEditMode={isEditMode}
                            markers={filt ? filt : markers}
                            setMarkers={setMarkers}
                            notFilt={filt ? markers : null}
                            insideFilterOnEditPage={!!filt}
                            style={{fontSize: "12px"}}
                            addMarkerToDatabase={addMarkerToDatabase}
                            templateForAddMarker={templateForAddMarker}
                            taskList={taskList}
                            setTaskName={setTaskName}
                            current_type={current_type}
                            moveTo={moveToTime}
                            isHaveAccess={myAccess === "редактор"}
                            markerForHighlight={markerForHighlight}
                        />
                    }
                </div>
            </div>

            <div className="playerBlock" style={{display: currentSession.videoURL && !changeVideo ? "flex" : "none"}}>
                {currentSession.videoURL
                    ? <>
                        <Player
                            wasAddedVideo={wasAddedVideo}
                            setWasAddedVideo={setWasAddedVideo}
                            relocationMarker={relocationMarker}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            pauses={pauses}
                            myAccess={myAccess}
                            audios={audios}
                            isEditMode={isEditMode}
                            currentSession={currentSession}
                            setAudios={setAudios}
                            playerRef={playerRef}
                            videoURL={currentSession.videoURL}
                            markers={markers}
                            setIsEditMode={setIsEditMode}
                            setCurTime={setCurrentTime}
                            setCurrentSecTime={setCurrentSecTime}
                            setChangeVideo={setChangeVideo}
                            setMarkerForHighlight={setMarkerForHighlight}/>

                        {myAccess === "редактор"
                            ?
                            <AudioYandexUpload
                                currentSession={currentSession}
                                audios={audios}
                                setAudios={setAudios}/>
                            : <></>
                        }

                    </>
                    : <></>
                }

            </div>

            {!currentSession.videoURL || changeVideo
                ? <div className="blockForDownload">
                    <VideoVkUpload setChangeVideo={setChangeVideo} currentSession={currentSession}
                                   setCurrentSession={setCurrentSession} setWasAddedVideo={setWasAddedVideo}/>
                </div>
                : <></>
            }


            {errorMark &&
                <h1>Произошла ошибка ${errorMark}</h1>
            }
        </div>
    )
};

export default EditVideoInSession;