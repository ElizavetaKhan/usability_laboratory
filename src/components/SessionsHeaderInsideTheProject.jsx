import React, {useEffect, useState} from 'react';
import "../styles/sessionsHeader.css"
import plus from './images/pluss.png'
import TabSession from "./TabSession";
import back from "./images/back.png";
import SessionForm from "./SessionForm";
import MyModal from "./UI/modal/MyModal";
import ProjectService from "../API/ProjectService";
import Cookies from "js-cookie";

const SessionsHeaderInsideTheProject = ({sessions, setSessions, backLink, currentSession, setCurrentSession, id, setColor, setGoToEdit, myAccess, exportSRT, goToEdit}) => {
    const [modal, setModal] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isStartFromDatabase, setIsStartFromDatabase] = useState(false);
    const [exportWindow, setExport] = useState(false)

    useEffect(() => {
        if (currentSession && currentSession.startSession) {
            setIsStartFromDatabase(true);
        } else {
            setIsStartFromDatabase(false);
        }
    },[currentSession])

    // ЕСЛИ ПОСЛЕ АВТОРИЗАЦИИ
    useEffect(() => {
        if (Cookies.get('id_session') && sessions.length > 0) {
            sessions.map((session) => {
                if (session.id_session === Cookies.get('id_session')) {
                    openSession(session);
                }
                return null;
            })
            Cookies.remove('id_session');
            Cookies.remove('id_project');
            Cookies.remove('project_name');
        }
    },[sessions])

    // НАЧАТЬ СЕССИЮ
    const startSession = async () => {
        const r = await ProjectService.startSession(currentSession.id_session)
        if (r.ERROR) {
            alert(r.ERROR);
        } else {
            setIsStart(true);
            setCurrentSession({...currentSession, startSession: r.start});
        }
    }

    // ОТСЛЕЖИВАНИЕ ОТКРЫТИЯ НОВОЙ СЕССИИ И ЗАКРЫТИЯ ПРЕДЫДУЩЕЙ
    const openSession = (tab) => {
        // убираем выделение предыдущего элемента
        if (currentSession) {
            currentSession.isSel = false;
        }

        // выделяем текущий
        tab.isSel = true;
        setCurrentSession(tab);
        setColor("#E1E1E1");
    }

    return (
        <div style={{width: "100%"}}>
            <div className="blackHeader">
                <div
                    style={{display: exportWindow ? "flex" : "none"}}
                    className="dropdownExport" onMouseEnter={() => setExport(true)}
                     onMouseLeave={() => setExport(false)}>
                        <button onClick={() => exportSRT()}>Экспорт SRT</button>
                        <button>Экспорт видео+аудио</button>
                </div>

                <div
                    className={`hamburger-menu ${currentSession ? '' : 'noHumburger'}`}
                    onMouseEnter={currentSession ? () => setExport(true) : undefined}
                    onMouseLeave={currentSession ? () => setExport(false) : undefined}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                </div>

                {sessions.map((session) =>
                    <TabSession session = {session} open = {openSession} key = {session.id_session}/>
                )}

                {myAccess === "редактор"
                    ? <div className="plus" onClick={() => setModal(true)}>
                        <img src={plus} alt="plus"/>
                    </div>
                    : <></>
                }

            </div>

            <div className="greyHeader">
                <button
                    style={
                        {backgroundImage: `url(${back})`,
                            backgroundSize: 'contain',
                            backgroundRepeat: "no-repeat",
                            backgroundColor: "unset",
                            cursor: "pointer",
                            margin: "5px 12px"}} onClick={() => backLink()}>
                </button>

                {currentSession && !currentSession.videoURL && myAccess === "редактор" && !goToEdit
                    ?
                    <>
                        {!isStart && !isStartFromDatabase
                            ? <button
                                onClick={() => startSession()}>
                                НАЧАТЬ ТЕСТИРОВАНИЕ
                            </button>

                            : <button
                                onClick={() => setGoToEdit(true)}>
                                ЗАВЕРШИТЬ ТЕСТИРОВАНИЕ
                            </button>
                        }
                    </>
                    : <></>
                }
            </div>

            <MyModal visible={modal} setVisible={setModal}>
                <SessionForm sessions={sessions} setModal={setModal} setSessions={setSessions} id = {id} open={openSession}/>
            </MyModal>
        </div>
    );
};

export default SessionsHeaderInsideTheProject;