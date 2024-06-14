import React from 'react';
import cross from "./images/cross.png";
import proj from "./images/untitledProject.png";
import {useNavigate} from 'react-router-dom'

const ProjectItem = (props) => {
    const router = useNavigate();

    const removeWindow = () => {
        props.remove(props.project.id_project)
    }

    return (
        <div className="project">
            <div style={{display: "grid"}}>
                {props.project.access_type === "редактор"
                    ? <img src={cross} alt="cross" className="cross" onClick={removeWindow}/>
                    : <></>
                }

                <img src={proj} alt="project"/>
            </div>
            <h4 onClick={() => router(`/projects/${props.project.name}/${props.project.id_project}`)} style={{cursor: "pointer", marginTop: "10px"}}> {props.project.name} </h4>
            <p> {props.project.date} </p>
        </div>
    );
};

export default ProjectItem;