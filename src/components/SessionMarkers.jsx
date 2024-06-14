import React, {useEffect, useState} from 'react';
import MarkerTypesList from "./MarkerTypesList";
import MarkersList from "./MarkersList";
import ProjectService from "../API/ProjectService";
import {useFetching} from "../hooks/useFetching";
import Loader from "./UI/loader/loader";
import Timer from "./Timer";

const SessionMarkers = ({markers, setMarkers, markerTypes, taskList, currentSession, color, setColor, setPauses}) => {
    const [taskName, setTaskName] = useState(null);
    const [timeDifference, setTimeDifference] = useState('');
    const [time, setTime] = useState(null);
    const [isPause, setIsPause] = useState(false);
    const [sumPauses, setSumPauses] = useState(null);
    const [timeWithoutPauses, setTimeWithoutPauses] = useState(null);

    // ЗАГРУЗКА МАРКЕРОВ И ПАУЗ У КОНКРЕТНОЙ СЕССИИ
    const [fetchMarkers, isLoadingMarkers, errorMark] = useFetching(async () => {
        if (currentSession) {
            const r = await ProjectService.getAllMarkersAndPauses(currentSession.id_session)
            if (!r[0].ERROR) {
                const [res1, res2, res3] = r;
                setMarkers(res1);
                setPauses(res2);
                setSumPauses(res3[0].pause);
            } else {
                alert(r[0].ERROR);
            }
        }
    })

    // обновление маркеров при изменении данной сессии
    useEffect(() => {
        fetchMarkers();
        if (currentSession.startSession) {
            const [, timePart] = currentSession.startSession.split(" ");
            setTime(timePart);
        } else {
            setTime(null);
        }
    }, [currentSession, currentSession.startSession])

    // ОТПРАВКА МАРКЕРА В БД И ПОЛУЧЕНИЕ НОВОГО id
    const addMarkerToDatabase = async (comment, marker) => {
        // Отправить данные и получить созданный id
        const r = await ProjectService.addMarker(comment, marker.id_type, timeWithoutPauses, currentSession.id_session)
        if (!r.ERROR) {
            // marker.id_marker = r.id;
            // marker.comment = comment;
            setMarkers((prevMarkers) =>
                prevMarkers.map((i) =>
                    i.id_marker === marker.id_marker ? { ...i, id_marker: r.id, comment: comment } : i
                )
            );
            // setMarkers([...markers, {id_marker: r.id, comment: comment, time: marker.time, color: marker.color, id_type: marker.id_type}]);
        } else {
            setMarkers(markers.filter(p => p.id_marker !== marker.id_marker));
            alert(r.ERROR);
        }
    }

    // ПРИ ИЗМЕНЕНИИ МАССИВА МАРКЕРОВ ЧЕКАЕМ НАЛИЧИЕ ЗАДАНИЯ(1 ТИП МАРКЕРА)
    useEffect(() => {
        if (taskName) {
            addMarkerToDatabase(`Начало задания «${taskName}»`, markers[markers.length - 1]);
            setTaskName(null);
        }
    }, [markers]);


    return (
        <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
            <div className="overlay" style={{
                display: isPause || !currentSession.startSession
                    ? "block"
                    : "none"}}>
            </div>

            {isLoadingMarkers
                ? <div style={{display: "flex", justifyContent: "center", marginTop:"100px"}}>
                    <Loader/>
                </div>

                : <div style={{padding: "30px 50px", maxWidth: "1250px", width:"100%"}}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"}}>
                            <MarkerTypesList
                                markerTypes={markerTypes}
                                setTaskName={setTaskName}
                                type="0"
                                taskList={taskList}
                                setColor={setColor}
                                markers={markers}
                                setMarkers={setMarkers}
                                time={timeDifference}
                            />
                            <Timer
                                setTimeDifference={setTimeDifference}
                                timeDifference={timeDifference}
                                setTimeWithoutPauses={setTimeWithoutPauses}
                                setIsPause={setIsPause}
                                isPause={isPause}
                                time={time}
                                currentSession={currentSession}
                                sumPauses={sumPauses}
                                setSumPauses={setSumPauses}
                            />
                    </div>

                    <div style={{
                        backgroundColor: `${color}40`,
                        overflow: "hidden auto",
                        height: "500px",
                        borderRadius: "0 20px 20px 20px",
                        padding:"35px 65px"}}>
                            <MarkersList
                                markers={markers}
                                setMarkers={setMarkers}
                                addMarkerToDatabase={addMarkerToDatabase}
                                isHaveAccess ={true}
                            />
                    </div>
                </div>
        }

        {errorMark &&
            <h1>Произошла ошибка ${errorMark}</h1>
        }
        </div>
    );
};

export default SessionMarkers;