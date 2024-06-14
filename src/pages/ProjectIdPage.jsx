import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ProjectService from "../API/ProjectService";
import {useFetching} from "../hooks/useFetching";
import Loader from "../components/UI/loader/loader";
import SessionsHeaderInsideTheProject from "../components/SessionsHeaderInsideTheProject";
import ProjectInfoInside from "../components/ProjectInfoInside";
import SessionMarkers from "../components/SessionMarkers";
import EditVideoInSession from "../components/EditVideoInSession";
import ExportServise from "../API/exportService";

const ProjectIdPage = () => {
    const params = useParams();
    const [projectInfo, setProjectInfo] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [access, setAccess] = useState([]);
    const [color, setColor] = useState("#E1E1E1");

    const [markers, setMarkers] = useState([]);
    const [markerTypes, setMarkerTypes]= useState([]);
    const [pauses, setPauses] = useState([]);
    const [goToEdit, setGoToEdit] = useState(false);
    const [myAccess, setMyAccess] = useState(null);

    const router = useNavigate();

    // ЗАГРУЗКА САМОГО ПРОЕКТА (СЕССИИ И ТИПЫ МАРКЕРОВ)
    const [fetchProjectById, isLoading, error] = useFetching(async () => {
        const r = await ProjectService.getProjectById(params.id);
        if (!r[0].ERROR) {
            const [project, session, markerType, taskList, acc, myAcc] = r;
            setProjectInfo(project[0]);

            let newSessions = [];
            for (let i = 0; i < session.length; ++i) {
                const newSession = {respondent: session[i].respondent, id_session: session[i].id_session, startSession: session[i].start, videoURL: session[i].videoURL}
                newSessions = [...newSessions, newSession];
            }

            setSessions(newSessions);
            setMarkerTypes(markerType);
            setTaskList(taskList);
            setAccess(acc);
            setMyAccess(myAcc[0].access_type);
        } else {
            alert(r[0].ERROR);
        }
    })

    // ОТРИСОВКА ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
    useEffect(() => {
        fetchProjectById();
    },[])

    // ВОЗВРАЩАЕМСЯ К ГЛАВНОЙ СТРАНИЦЕ ПРОЕК ТА ИЛИ К ПРОЕКТАМ
    const backLink = () => {
        if (currentSession) {
            currentSession.isSel = false;
            setCurrentSession(null);
            setGoToEdit(false);
        } else {
            router('/projects');
        }
    }

    const exportSRT = async () => {
        await ExportServise.exportSRT(markers);
    }

    return (
        <div>
            {isLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop:"100px"}}>
                    <Loader/>
                </div>
                :
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", minWidth: "1150px"}}>
                    <SessionsHeaderInsideTheProject
                        sessions={sessions}
                        setSessions={setSessions}
                        backLink = {backLink}
                        currentSession={currentSession}
                        setCurrentSession={setCurrentSession}
                        id={params.id}
                        setColor={setColor}
                        setGoToEdit={setGoToEdit}
                        goToEdit={goToEdit}
                        myAccess={myAccess}
                        exportSRT={exportSRT}
                    />

                    {!currentSession
                        ? <ProjectInfoInside
                            projectInfo={projectInfo}
                            setProjectInfo={setProjectInfo}
                            sessions={sessions}
                            setSessions={setSessions}
                            markerTypes={markerTypes}
                            taskList={taskList}
                            access={access}
                            setAccess={setAccess}
                            myAccess={myAccess}
                            setTaskList={setTaskList}
                        />

                        : <>
                            {myAccess === "читатель" && !currentSession.videoURL
                                ? <h2
                                    style={{textAlign: 'center', marginTop: "50px"}}> Данная сессия еще не закончена, у Вас пока нет доступа к ней
                                </h2>
                                : <>
                                    {!goToEdit && !currentSession.videoURL
                                        ? <SessionMarkers
                                            markers={markers}
                                            setMarkers={setMarkers}
                                            markerTypes={markerTypes}
                                            taskList={taskList}
                                            currentSession={currentSession}
                                            color={color}
                                            setColor={setColor}
                                            setPauses={setPauses}
                                        />

                                        : <EditVideoInSession
                                            markers={markers}
                                            setMarkers={setMarkers}
                                            markerTypes={markerTypes}
                                            currentSession={currentSession}
                                            setCurrentSession={setCurrentSession}
                                            setGoToEdit={setGoToEdit}
                                            taskList={taskList}
                                            goToEdit={goToEdit}
                                            pauses={pauses}
                                            setPauses={setPauses}
                                            myAccess={myAccess}
                                        />
                                    }
                                </>
                            }
                        </>
                    }
                </div>
            }

            {error &&
                <h1>Произошла ошибка ${error}</h1>
            }
        </div>
    );
};

export default ProjectIdPage;

