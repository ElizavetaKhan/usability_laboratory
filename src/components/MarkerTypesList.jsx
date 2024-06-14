import React, {useState} from 'react';
import MarkerType from "./MarkerType";
import DropTaskList from "./dropTaskList";

const MarkerTypesList = ({markerTypes, type, chooseType, markers, setMarkers, taskList, setTaskName, setColor, setIsAllMarkers, time}) => {
    const [mouseOnTaskList, setMouseOnTaskList] = useState(false);

    const allMarkersType = ({
        id: 0,
        name: "ВСЕ",
        color: "#F6F6F6"
    });

    // ДОБАВЛЕНИЕ ПЕРВОГО ЗАДАНИЯ С НАЗВАНИЕМ ЗАДАНИЯ
    const addStartTask = (name) => {
        templateForAddMarker(markerTypes[0].color, markerTypes[0].id_type);
        setTaskName(name);
    }

    // ЗАПОЛНЕНИЕ НОВОГО МАРКЕРА
    const templateForAddMarker = (color, id_type) => {
        setColor(color);
        setMarkers([...markers, {
            time: time,
            color: color,
            id_type: id_type,
            id_marker: Date.now().toString()
        }]);
    }

    return (
        <>
            {mouseOnTaskList
                ? <DropTaskList
                    list={taskList}
                    setMouseOnTaskList={setMouseOnTaskList}
                    clickOnTask={addStartTask}
                />
                : <></>
            }
            <div style={{
                display: "flex",
                flexDirection: type === "1" ? "column" : "",
                width: type === "1" ? "max-content" : "",
                rotate: type === "1" ? "-90deg" : "",
                marginLeft: type === "1" ? "187px" : "",
                marginTop: type === "1" ? "-178px" : "",
                marginBottom: type === "1" ? "-187px" : "",
                }}>

                {type === "1"
                    ? <MarkerType
                        text = {allMarkersType.name}
                        color = {allMarkersType.color}
                        id = {allMarkersType.id}
                        key = {allMarkersType.id}
                        chooseType = {chooseType}
                        setIsAllMarkers = {setIsAllMarkers}
                        type = "2"
                    />
                    : <></>
                }

                {markerTypes.map((mark) =>
                    <MarkerType
                        text = {mark.name}
                        color = {mark.color}
                        id = {mark.id_type}
                        key = {mark.id_type}
                        templateForAddMarker = {templateForAddMarker}
                        chooseType = {chooseType}
                        mouseCheck={setMouseOnTaskList}
                        type = {type}
                    />
                )}
            </div>
        </>
    );
};

export default MarkerTypesList;