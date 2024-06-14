import React from 'react';
import '../styles/dropTaskList.css'

const DropTaskList = ({list, setMouseOnTaskList, clickOnTask, coordinates}) => {
    return (
        <div
            style={{
                top: coordinates ? coordinates.y : "",
                left: coordinates ? coordinates.x : "",
                transform: coordinates ? "translate(-50%, 0)" : ""
            }}
            className = "tasklist"
            onMouseEnter={() => setMouseOnTaskList(true)}
            onMouseLeave={() => setMouseOnTaskList(false)}>

            {list.map((task) =>
                <button onClick={() => {clickOnTask(task.name)}}>
                    {task.name}
                </button>
            )}
        </div>
    );
};

export default DropTaskList;