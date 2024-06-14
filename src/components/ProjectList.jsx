import React from 'react';
import ProjectItem from "./ProjectItem";

const ProjectList = ({projects, setIdForDelete}) => {

    if (!projects.length) {
        return (
            <h2
                style={{textAlign: 'center', marginTop: "50px"}}>Нет существующих проектов
            </h2>
        )
    }
    return (
        <div className="projects">
            {projects.map((project) =>
                <ProjectItem remove={setIdForDelete} project={project} key={project.id_project}/>
            )}
        </div>
    );
};

export default ProjectList;