import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/myButton";
import ProjectService from "../API/ProjectService";

const SessionForm = ({sessions, setSessions, setModal, id, open}) => {
    const [session, setSession] = useState({respondent: ''})

    // ДОБАВЛЕНИЕ НОВОЙ СЕССИИ И ОТПРАВКА В БАЗУ
    const addNewSession = async (e) => {
        e.preventDefault();

        // Отправить данные
        const r = await ProjectService.addNewSession(session.respondent, id)
        if (!r.ERROR) {
            session.id_session = r.id;
            open(session);
            setSessions([...sessions, session]);
        } else {
            alert(r.ERROR);
        }
        setModal(false);
        setSession({respondent: ''})
    }

    return (
        <form>
            {/*УПРАВЛЯЕМЫЙ КОМПОНЕНТ*/}
            <MyInput autoFocus
                value = {session.respondent}
                onChange = {e => setSession({...session, respondent: e.target.value})}
                type="text"
                name="sessionForm"
                placeholder="Имя респондента"
            />
            <MyButton onClick={addNewSession}>Добавить респондента</MyButton>
        </form>
    );
};

export default SessionForm;