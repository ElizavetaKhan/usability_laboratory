import React, {useEffect, useState} from 'react';
import NewMarker from "./NewMarker";
import plus from "./images/plussGrey.png";
import ProjectService from "../API/ProjectService";
import DropTaskList from "./dropTaskList";
import DeleteModal from "./UI/deleteModal/deleteModal";
import MyModal from "./UI/modal/MyModal";

const MarkersList = ({markers, setMarkers, addMarkerToDatabase, insideFilterOnEditPage, templateForAddMarker, setTaskName, current_type, taskList, notFilt, moveTo, isHaveAccess, markerForHighlight, isEditMode}) => {
    const [mouseOnTaskList, setMouseOnTaskList] = useState(false);
    const [buttonCoordinates, setButtonCoordinates] = useState({ x: 0, y: 0 });
    const [acceptDeleting, setAcceptDeleting] = useState(false);
    const [idForDelete, setIdForDelete] = useState(null);

    // ДОБАВЛЕНИЕ ПЕРВОГО ЗАДАНИЯ С НАЗВАНИЕМ ЗАДАНИЯ
    const addStartTask = (name) => {
        templateForAddMarker();
        setTaskName(name);
    }

    const dropMarker = async () => {
        if (idForDelete && acceptDeleting) {

            const r = await ProjectService.dropMarker(idForDelete);
            if (!r) {
                notFilt
                    ? setMarkers(notFilt.filter(p => p.id_marker !== idForDelete))
                    : setMarkers(markers.filter(p => p.id_marker !== idForDelete))
            } else {
                alert(r.ERROR);
            }

            setIdForDelete(false);
            setAcceptDeleting(false);
        }
    }

    // УДАЛЕНИЕ МАРКЕРА
    useEffect(() => {
        dropMarker();
    }, [acceptDeleting]);

    const handleMouseEnter = (e) => {
        setButtonCoordinates({ x: e.clientX, y: e.clientY });
        setMouseOnTaskList(true)
    };

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            {markers.map((marker) =>
                <NewMarker
                    isEditMode={isEditMode}
                    setMarkers={setMarkers}
                    marker={marker}
                    remove={setIdForDelete}
                    addMarkerToDatabase={addMarkerToDatabase}
                    moveTo={moveTo}
                    key = {marker.id_marker}
                    isHaveAccess={isHaveAccess}
                    markerForHighlight={markerForHighlight}
                />
            )}

            {insideFilterOnEditPage && isHaveAccess
                ? <button
                    onMouseEnter={current_type === "1" ? handleMouseEnter : undefined}
                    onMouseLeave={current_type === "1" ? () => setMouseOnTaskList(false) : undefined}
                    onClick={() => templateForAddMarker()}
                    style={{
                        alignSelf: "center",
                        width: "10px",
                        border: "0",
                        height: "10px",
                        backgroundImage: `url(${plus})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "unset",
                        cursor: "pointer"}}
                >
                </button>
                : <></>
            }

            {mouseOnTaskList
                ? <DropTaskList
                    list={taskList}
                    setMouseOnTaskList={setMouseOnTaskList}
                    clickOnTask={addStartTask}
                    coordinates={buttonCoordinates}
                />
                : <></>
            }

            <MyModal visible={idForDelete} setVisible={setIdForDelete}>
                <DeleteModal
                    type="данный комментарий"
                    setAcceptDeleting={setAcceptDeleting}
                    setVisible={setIdForDelete}
                />
            </MyModal>
        </div>
    );
};

export default MarkersList;