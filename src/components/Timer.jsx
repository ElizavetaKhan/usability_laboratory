import React, {useEffect, useState} from 'react';
import pause from "./images/pause.png";
import start from "./images/startPause.png"
import ProjectService from "../API/ProjectService";

const Timer = ({isPause, setIsPause, setTimeDifference, timeDifference, time, currentSession, sumPauses, setSumPauses, setTimeWithoutPauses}) => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // считаем каждую секунду
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // вычисляем разницу – текущее время с начала сессии
    useEffect(() => {
        if (time && !isPause) {
            const date1 = new Date(`2000-01-01 ${time}`);
            const date2 = new Date(`2000-01-01 ${currentTime}`);
            let differenceMs = date2.getTime() - date1.getTime();

            setTimeWithoutPauses(new Date(differenceMs).toISOString().slice(11, 19));

            if (sumPauses) {
                const pause = new Date(`2000-01-01 ${formatTime(sumPauses)}`);
                differenceMs = differenceMs - pause.getTime() - (3 * 60 * 60 * 1000);
            }
            setTimeDifference(new Date(differenceMs).toISOString().slice(11, 19));
        }
    }, [time, currentTime]);

    // ПАУЗА
    const startPause = async () => {
        const r = await ProjectService.startPause(currentSession.id_session)
        if (r) {
            alert(r.ERROR);
        } else {
            setIsPause(!isPause);
        }
    }

    // КОНЕЦ ПАУЗЫ
    const endPause = async () => {
        const r = await ProjectService.endPause(currentSession.id_session)
        if (!r.ERROR) {
            setSumPauses(prevSum => (prevSum === null ? parseInt(r.pause, 10) : parseInt(prevSum, 10) + parseInt(r.pause, 10)));
            setIsPause(!isPause);
        } else {
            alert(r.ERROR);
        }
    }

    return (
        <>
            {time
                ? <div style={{
                    display: "flex",
                    alignItems: "center",
                    zIndex: "2"
                }}>
                    <img
                        src={isPause ? start : pause}
                        alt="pause"
                        width="22px"
                        height="22px"
                        onClick={isPause ? endPause : startPause}
                        style={{
                            marginRight:"10px",
                            cursor: "pointer"}}
                    />

                    <p style={{
                        fontSize: "30px",
                        color: "#AFAFAF",
                        width: "125px"
                    }}>
                        {timeDifference}</p>
                </div>
                : <></>
            }
        </>
    );
};

export default Timer;