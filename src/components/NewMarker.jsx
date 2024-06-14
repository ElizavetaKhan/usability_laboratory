import React, {useEffect, useRef, useState} from 'react';
import cross from './images/crossBlack.png'
import ProjectService from "../API/ProjectService";

const NewMarker = ({marker, remove, addMarkerToDatabase, moveTo, isHaveAccess, markerForHighlight, setMarkers}) => {
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const markerRef = useRef(null);

    useEffect(() => {
        if (!marker.comment) {
            if (marker.id_type === "2") {
                addMarkerToDatabase("Конец задания", marker);
            }

            setIsEditing(true);
        }
    }, [marker.comment])

    useEffect(() => {
        if (markerRef && markerForHighlight && markerForHighlight !== marker.id_marker) {
            markerRef.current.style.transition = 'opacity 0.3s ease';
            markerRef.current.style.opacity = 0.5;
        } else if (markerRef) {
            markerRef.current.style.opacity = 1;
        }
    }, [markerForHighlight]);

    const editMarker = (e) => {
        e.preventDefault();
        setIsEditing(true);
        setInputValue(marker.comment);
    }

    const escape = (event) => {
        if (event.key === 'Escape') {
            setIsEditing(false);
        }
    }

    const updateComment = async () => {
        if (!marker.comment) {
            addMarkerToDatabase(inputValue, marker);

        } else {
            const r = await ProjectService.editMarker(marker.id_marker, inputValue)
            if (!r) {
                setMarkers((prevMarkers) =>
                    prevMarkers.map((i) =>
                        i.id_marker === marker.id_marker ? {...i, comment: inputValue} : i
                    )
                );
            } else {
                alert(r.ERROR);
            }
        }
        setIsEditing(false);
    }

    return (
        <div className="newMarker" ref={markerRef}
             style={moveTo ? { cursor: 'pointer' } : {}}
             onContextMenu={isHaveAccess ? editMarker : undefined}
             onDoubleClick={isHaveAccess ? editMarker : undefined}>

            <div className="background" style={{backgroundColor: marker.color}}></div>

            <div
                className="blockMarker"
                style={isEditing ? {boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'} : {}}
                onClick={moveTo ? () => moveTo(marker) : undefined}
            >
                <p style={{marginRight: "15px", width: "45px"}}> {marker.time} </p>

                <div>
                    {!isEditing && marker.comment
                        ? <p> {marker.comment} </p>

                        : <input autoFocus
                                   type="text"
                                   name="editComment"
                                   value={inputValue}
                                   onKeyDown={marker.comment ? escape : undefined}
                                   onBlur={updateComment}
                                   onChange={(event) => setInputValue(event.target.value)}
                                   placeholder={!marker.comment ? "Введите комментарий..." : undefined}
                            />
                    }

                    {isHaveAccess && marker.comment && !isEditing
                        ? <button
                            onClick={() => remove(marker.id_marker)}
                            style={{
                                backgroundImage: `url(${cross})`,
                                width: '13px',
                                height: '13px',
                                zIndex: '2'
                            }}>
                        </button>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
};

export default NewMarker;