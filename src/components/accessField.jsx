import React, {useState} from 'react';
import SelectUserForAccess from "./UI/SelectUserForAccess/SelectUserForAccess";
import Select from "react-select";
import ProjectService from "../API/ProjectService";

const AccessField = ({users, idProject, setAccess, access}) => {
    const [choice, setChoice] = useState('');
    const [loginForAccess, setLogin] = useState(null);

    const giveAccess = async () => {
        if (loginForAccess && choice) {
            const ch = choice.value ==='editor' ? 1 : 2;
            const choiceForPaste = ch === 1 ? 'редактор' : 'читатель';
            const r = await ProjectService.giveAccess(idProject, loginForAccess.value, ch)
            if (r) {
                alert(r.ERROR);
            } else {
                setAccess([...access, {
                    login: loginForAccess.value,
                    access_type: choiceForPaste}]);
            }

        } else {
            alert("Заполните все поля")
        }
    }

    return (
        <div style={{display: "flex"}}>
            <div style={{
                width: "200px",
                fontSize: "13px"}}>
                <SelectUserForAccess
                    setLogin={setLogin}
                    users={users}/>
            </div>

            <div style={{
                width: "200px",
                fontSize: "13px"}}>
                <Select
                    value={choice}
                    onChange={selectedSort => setChoice(selectedSort)}
                    placeholder="Тип доступа"
                    options={[
                        {value: 'editor', label: "Редактор"},
                        {value: 'reader', label: "Читатель"},
                    ]}
                />
            </div>

            <button
                onClick={giveAccess}
                style={{
                    border: "0",
                    background: "none",
                    cursor: "pointer",
                    padding: "10px"
                }}>
                Добавить пользователя
            </button>
        </div>
    );
};

export default AccessField;