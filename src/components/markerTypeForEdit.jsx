import React, {useRef, useState} from 'react';
import ProjectService from "../API/ProjectService";

const MarkerTypeForEdit = ({type, id_proj, myAccess}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newType, setNewType] = useState('');
    const ref = useRef(null);

    const editType = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setNewType(type.name);
    }

    const updateType = async () => {
        const r = await ProjectService.editType(type.id_type, id_proj, newType)
        if (!r) {
            type.name = newType;
        } else {
            alert(r.ERROR);
        }
        setIsEditing(false);
    }

    const escape = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }

    return (
        <div style={{backgroundColor: !isEditing ? `${type.color}80` : type.color}}
             onContextMenu={myAccess === "редактор" && (type.id_type !== "1" && type.id_type !== "2") ? editType : undefined}
             onDoubleClick={myAccess === "редактор" && (type.id_type !== "1" && type.id_type !== "2") ? editType : undefined}
             ref={ref}>
            { isEditing
                ? <input autoFocus
                           type="text"
                           name="editType"
                           value={newType}
                           onChange={(event) => setNewType(event.target.value)}
                           onKeyDown={escape}
                           onBlur={updateType}
                />

                : <h4> {type.name} </h4>
            }
        </div>
    );
};

export default MarkerTypeForEdit;