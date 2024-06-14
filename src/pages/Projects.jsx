import React, {useEffect, useState} from "react";
import "../styles/App.css";
import ProjectList from "../components/ProjectList";
import ProjectForm from "../components/ProjectForm";
import ProjectFilter from "../components/ProjectFilter";
import MyModal from "../components/UI/modal/MyModal";
import CustomHeader from "../components/UI/MyHeader/customHeader";
import plus from "../components/images/plus.png";
import {useProjects} from "../hooks/useProjects";
import ProjectService from "../API/ProjectService";
import Loader from "../components/UI/loader/loader";
import {useFetching} from "../hooks/useFetching";
import Cookies from 'js-cookie';
import DeleteModal from "../components/UI/deleteModal/deleteModal";

function Projects() {
    // ПРОЕКТЫ
    const [projects, setProjects] = useState( [])

    // УПРАВЛЯЕМЫЕ ЭЛЕМЕНТЫ
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false);
    const [idForDelete, setIdForDelete] = useState(null);
    const [acceptDeleting, setAcceptDeleting] = useState(false)

    // КАСТОМНЫЙ ХУК
    const sortedAndSearchedProjects = useProjects(projects, filter.sort, filter.query);
    // хук для обработки ошибки и загрузки данных
    const [fetchProjects, isProjectsLoading, projectError] = useFetching(async () => {
        const r = await ProjectService.getAllProjects()
        if (!r.ERROR) {
            setProjects(r);
        } else {
            alert(r.ERROR);
        }
    })

    useEffect(() => {
        fetchProjects();
    }, [])

    const dropProject = async () => {
        if (acceptDeleting && idForDelete) {
            const r = await ProjectService.dropProject(idForDelete)
            if (!r) {
                setProjects(projects.filter(p => p.id_project !== idForDelete))
            } else {
                alert(r.ERROR);
            }
            setAcceptDeleting(false);
            setIdForDelete(null);
        }
    }

    useEffect( () => {
        dropProject()
    }, [acceptDeleting]);

    const createProject = async (newProject) => {
        const r = await ProjectService.addProject(newProject.name, newProject.comment, newProject.list, newProject.list.split(', ').length)
        if (!r.ERROR) {
            newProject.id_project = r.id;
            newProject.access_type = "редактор";
            setProjects([...projects, newProject]);
        } else {
            alert(r.ERROR);
        }
        setModal(false)
    }

    return (
        <div className="App">
            <CustomHeader login={Cookies.get('login')}/>

            {/*СТРАНИЦА С ПРОЕКТАМИ*/}
            <div className="mainBody">

                <div style={{display: "flex", justifyContent: "space-between", paddingBottom: "40px"}}>
                    <h2>
                        Мои проекты
                    </h2>
                    <div onClick={() => setModal(true)} className="createButton">
                        <img src={plus} alt="plus" width="15px" style={{marginRight: "7px"}}/>
                        <button>Создать</button>
                    </div>
                </div>

                <MyModal visible={modal || idForDelete} setVisible={setModal || setIdForDelete}>
                    {idForDelete
                        ? <DeleteModal
                            type="данный проект"
                            setAcceptDeleting={setAcceptDeleting}
                            setVisible={setIdForDelete}/>
                        : <ProjectForm create={createProject}/>
                    }
                </MyModal>

                <ProjectFilter
                    filter={filter}
                    setFilter={setFilter}
                />
                {projectError &&
                    <h1>Произошла ошибка ${projectError}</h1>
                }
                {isProjectsLoading
                    ? <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}}>
                        <Loader/>
                    </div>
                    : <ProjectList
                        setIdForDelete={setIdForDelete}
                        projects={sortedAndSearchedProjects}/>
                }

            </div>
        </div>
    );
}

export default Projects;
