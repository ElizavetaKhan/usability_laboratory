import React, {useState} from 'react';
import MarkerTypeForEdit from "./markerTypeForEdit";
import TaskList from "./TaskList";
import NamePlusComment from "./NamePlusComment";
import plus from "./images/plussGrey.png";
import ProjectService from "../API/ProjectService";

const MarkerTypesAndTasksInInfo = ({projectInfo, markerTypes, myAccess, taskList, setTaskList, setProjectInfo}) => {
    const [isAdded, setIsAdded] = useState(false);

    const addToTaskList = (newTask) => {
        setTaskList([...taskList, {name: newTask}]);
    }

    const removeTask = async (taskName) => {
        const r = await ProjectService.dropTask(projectInfo.id_project, taskName)
        if (r) {
            alert(r.ERROR);
        } else {
            setTaskList(taskList.filter(p => p.name !== taskName))
        }
    }

    return (
        <>
            <NamePlusComment projectInfo={projectInfo} myAccess={myAccess} setProjectInfo={setProjectInfo}/>

            <div className="block">
                <div>
                    <h3 style={{marginBottom: "10px"}}>Список типов маркеров:</h3>
                    {markerTypes.map((type) =>
                        <MarkerTypeForEdit type={type} id_proj={projectInfo.id_project} myAccess={myAccess}/>
                    )}

                    {myAccess === "редактор"
                        ?
                        <h6>Для изменения какого-либо типа (кроме «Начало задания» и «Конец задания»), маркера или задания кликните <b>правой кнопкой мыши</b> или же <b>дважды левой</b>, для подтверждения изменений или отправки данных кликните <b>вне
                            поля для ввода</b>, а для их отмены нажмите <b>«Escape»</b></h6>
                        : <></>
                    }
                </div>


                <div style={{display: "flex", flexDirection: "column"}}>
                    <h3>Список заданий:</h3>
                    <ol>
                        {taskList.map((task) =>
                            <TaskList task={task.name} myAccess={myAccess} id_project={projectInfo.id_project} remove={removeTask}/>
                        )}
                    </ol>

                    {myAccess === "редактор"
                        ? <>
                        {isAdded
                            ? <TaskList task={null} id_project={projectInfo.id_project} setIsAdded={setIsAdded} add={addToTaskList}/>

                            : <button
                                className="buttInProjInfo"
                                onClick={() => setIsAdded(true)}
                                style={{
                                    alignSelf: "center",
                                    marginTop: "10px",
                                    width: "15px",
                                    height: "15px",
                                    backgroundImage: `url(${plus})`,
                                }}
                            >
                            </button>
                        }</>
                        : <></>
                    }
                </div>
            </div>
        </>
    );
};

export default MarkerTypesAndTasksInInfo;