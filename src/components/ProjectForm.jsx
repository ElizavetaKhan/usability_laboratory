import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/myButton";

const ProjectForm = ({create}) => {
    const [project, setProject] = useState({name: '', date: '', comment: '', list: ''})
    const addNewProject = (e) => {
        e.preventDefault()
        const newProject = {
            ...project, date: getDate()
        }

        create(newProject);
        setProject({name: '', date: '', comment: '', list: ''})
    }

    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}.${month}.${year}`;
    }

    return (
        <form>
            {/*УПРАВЛЯЕМЫЙ КОМПОНЕНТ*/}
            <MyInput
                value = {project.name}
                onChange = {e => setProject({...project, name: e.target.value})}
                type="text"
                name="projectName"
                placeholder="Название проекта"
            />

            <MyInput
                value = {project.list}
                onChange = {e => setProject({...project, list: e.target.value})}
                type="text"
                name="taskList"
                placeholder="Список заданий (строго в формате: Первое задание, Второе задание...)"
            />

            <MyInput
                value = {project.comment}
                onChange = {e => setProject({...project, comment: e.target.value})}
                type="text"
                name="comment"
                placeholder="Комментарий"
            />
            <MyButton onClick={addNewProject}>Создать</MyButton>
        </form>
    );
};

export default ProjectForm;