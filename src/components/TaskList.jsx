import React, {useEffect, useRef, useState} from 'react';
import ProjectService from "../API/ProjectService";
import cross from "./images/crossBlack.png";

const TaskList = ({task, id_project, myAccess, setIsAdded, add, remove}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [saveValue, setSaveValue] = useState('');
    const [send, setSend] = useState(false);
    const refInput = useRef(null);

    const edit = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setNewValue(e.target.innerText);
        setSaveValue(e.target.innerText)
    }

    useEffect(() => {
        if (!task) {
            setIsEditing(true);
        }
    }, [task]);

    const addTask = async () => {
        const r = await ProjectService.addTask(id_project, newValue)
        if (r) {
            alert(r.ERROR);
        } else {
            add(newValue);
        }

        setIsEditing(false);
        if (!task) {
            setIsAdded(false);
        }
    }

    const update = async () => {
        const r = await ProjectService.editTaskName(id_project, newValue, saveValue)
        if (r) {
            alert(r.ERROR);
        } else {
            setSend(true);
        }
        setIsEditing(false);
    }

    const escape = (event) => {
        if (event.key === 'Escape') {
            setSend(false)
            setIsEditing(false);
        }
    }

    return (
        <>
            {isEditing
                    ? <input autoFocus
                               type="text"
                               className="taskkk"
                               name="editComment"
                               placeholder={task ? undefined : "Впишите название задания..."}
                               value={newValue}
                               onChange={(event) => setNewValue(event.target.value)}
                               onBlur={task ? update : addTask}
                               onKeyDown={escape}
                               ref={refInput}
                               style={{paddingLeft: "0"}}
                    />
                : <div style={{display: "flex", alignItems: "center"}}>
                    <li onContextMenu={myAccess === "редактор" ? edit : undefined}
                        onDoubleClick={myAccess === "редактор" ? edit : undefined}> {send ? newValue : task} </li>

                    {myAccess === "редактор"
                        ? <button
                            className="buttInProjInfo"
                            onClick={() => remove(task)}
                            style={{
                                backgroundImage: `url(${cross})`,
                                width: '11px',
                                height: '11px'
                            }}>
                        </button>
                        : <></>
                    }
                </div>
            }
        </>
    );
};

export default TaskList;