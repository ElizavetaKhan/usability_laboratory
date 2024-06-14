import React, {useRef, useState} from 'react';
import cross from "./images/crossBlack.png";
import ProjectService from "../API/ProjectService";

const ListOfRespondents = ({session, myAccess, sessions, setSessions}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState('');
    const refInput = useRef(null);

    const dropSession = async () => {
        const r = await ProjectService.dropSession(session.id_session)
        if (r) {
            alert(r.ERROR);
        } else {
            setSessions(sessions.filter(p => p.id_session !== session.id_session));
        }
    }

    const edit = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setNewValue(e.target.innerText);
    }

    const update = async () => {
        const r = await ProjectService.editRespondent(session.id_session, newValue)
        if (r) {
            alert(r.ERROR);
        } else {
            setSessions((prevSessions) =>
               prevSessions.map((i) =>
                   i.id_session === session.id_session ? { ...i, respondent: newValue } : i
                )
            );
        }
        setIsEditing(false);
    }

    const escape = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }

    return (
        <>
            {isEditing
                ? <input autoFocus
                           className="respondents"
                           type="text"
                           name="editComment"
                           value={newValue}
                           onChange={(event) => setNewValue(event.target.value)}
                           onKeyDown={escape}
                           onBlur={update}
                           ref={refInput}/>

                : <div
                    onContextMenu={myAccess === "редактор" ? edit : undefined}
                    onDoubleClick={myAccess === "редактор" ? edit : undefined}
                    style={{display: "flex", alignItems: "center"}}>
                    <h4 style={{width: "fit-content"}}> {session.respondent} </h4>

                    {myAccess === "редактор"
                            ? <button
                                className="buttInProjInfo"
                                onClick={dropSession}
                                style={{
                                    backgroundImage: `url(${cross})`,
                                    width: '11px',
                                    height: '11px',
                                }}>
                            </button>
                            : <></>
                        }
                </div>
            }
        </>
    );
};

export default ListOfRespondents;