import React, {useEffect, useState} from 'react';
import AccessField from "./accessField";
import ProjectService from "../API/ProjectService";
import MarkerTypesAndTasksInInfo from "./MarkerTypesAndTasksInInfo";
import {useFetching} from "../hooks/useFetching";
import Loader from "./UI/loader/loader";
import Cookies from "js-cookie";
import WhoHasAccess from "./whoHasAccess";
import ListOfRespondents from "./ListOfRespondents";

const ProjectInfoInside = ({projectInfo, taskList, access, setAccess, myAccess, markerTypes, setTaskList, sessions, setSessions, setProjectInfo}) => {
    const [users, setUsers] = useState([]);
        const [isFiltered, setIsFiltered] = useState(false);

    const [uploadUsers, isLoadingMarkers, errorUsers] = useFetching(async () => {
        let allUsers;
        const r = await ProjectService.getAllUsers()
        if (!r.ERROR) {
            allUsers = r;
            let USERS = [];
            for (let i = 0; i < allUsers.length; ++i) {
                if (allUsers[i].login !== Cookies.get('login')) {
                    const temp = {value: allUsers[i].login, label: allUsers[i].login}
                    USERS = [...USERS, temp];
                }
            }

            setUsers(USERS);
        } else {
            alert(r.ERROR);
        }
    })

    useEffect(() => {
        if (access.length !== 0 && users.length !== 0 && !isFiltered) {
            const filteredUSERS =
                users.filter(user => {
                return !access.some(accessUser => accessUser.login === user.value);
            });
            setUsers(filteredUSERS);
            setIsFiltered(true);
        }
    }, [access, users, isFiltered]);

    useEffect(() => {
        uploadUsers()
    },[]);

    const dropAccess = async (logForDelete) => {
        const r = await ProjectService.dropAccess(projectInfo.id_project, logForDelete)
        if (r) {
            alert(r.ERROR);
        } else {
            setAccess(access.filter(p => p.login !== logForDelete));
        }
    }

    return (
        <>
            {isLoadingMarkers
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
                    <Loader/>
                </div>

                :
                <div className="projectInfo">

                    <MarkerTypesAndTasksInInfo
                        setProjectInfo={setProjectInfo}
                        taskList={taskList}
                        projectInfo={projectInfo}
                        markerTypes={markerTypes}
                        myAccess={myAccess}
                        setTaskList={setTaskList}/>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div>
                            <h3>Проект доступен:</h3>
                            {access.map((access) =>
                                <WhoHasAccess myAccess={myAccess} access={access} dropAccess={dropAccess}/>
                            )}

                            <br/>

                            {myAccess === "редактор"
                                ? <>
                                    <h3 style={{marginBottom: "10px"}}>Предоставить доступ</h3>
                                    <AccessField
                                        setAccess={setAccess}
                                        idProject={projectInfo.id_project}
                                        access={access}
                                        users={users}
                                    />
                                </>

                                : <></>
                            }
                        </div>

                        <div>
                            <h3>Респонденты проекта:</h3>
                            {sessions.map((session) =>
                                <ListOfRespondents
                                    session={session}
                                    myAccess={myAccess}
                                    sessions={sessions}
                                    setSessions={setSessions}/>
                            )}
                        </div>
                    </div>
                </div>
            }

            {errorUsers &&
                <h1>Произошла ошибка ${errorUsers}</h1>
            }
        </>
    );
}
    ;

    export default ProjectInfoInside;