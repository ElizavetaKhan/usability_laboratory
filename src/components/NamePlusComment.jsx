import React, {useRef, useState} from 'react';
import ProjectService from "../API/ProjectService";

const NamePlusComment = ({projectInfo, myAccess, setProjectInfo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState('');
    const [saveValue, setSaveValue] = useState('');
    const refInput = useRef(null);

    const edit = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setNewValue(e.target.innerText);
        setSaveValue(e.target.innerText)
    }

    const escape = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }

    const update = async () => {
        if (saveValue === projectInfo.name) {
            const r = await ProjectService.editProjectName(projectInfo.id_project, newValue)
            if (!r) {
                setProjectInfo({...projectInfo, name: newValue});
            } else {
                alert(r.ERROR);
            }
        } else {
            const r = await ProjectService.editProjectComment(projectInfo.id_project, newValue)
            if (!r) {
                setProjectInfo({...projectInfo, comment: newValue});
            } else {
                alert(r.ERROR);
            }
        }

        setIsEditing(false);
    }

    return (
        <>
            {isEditing && saveValue === projectInfo.name
                ? <input autoFocus
                           type="text"
                           name="editName"
                           value={newValue}
                           onChange={(event) => setNewValue(event.target.value)}
                           onBlur={update}
                           onKeyDown={escape}
                           className="fromH1"
                           ref={refInput}
                    />
                : <h1 onContextMenu={myAccess === "редактор" ? edit : undefined}
                      onDoubleClick={myAccess === "редактор" ? edit : undefined}>{projectInfo.name}</h1>
            }

            {isEditing && saveValue === projectInfo.comment
                ? <input autoFocus
                           type="text"
                           name="editComment"
                           value={newValue}
                           onKeyDown={escape}
                           onBlur={update}
                           onChange={(event) => setNewValue(event.target.value)}
                           className="fromH2"
                           ref={refInput}
                    />
                : <h2 onContextMenu={myAccess === "редактор" ? edit : undefined}
                      onDoubleClick={myAccess === "редактор" ? edit : undefined}>{projectInfo.comment}</h2>
            }
        </>
    );
};

export default NamePlusComment;