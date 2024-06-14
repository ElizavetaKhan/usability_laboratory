import React from 'react';
import MyButton from "../button/myButton";
import st from '../modal/MyModal.module.css'

const DeleteModal = ({type, setAcceptDeleting, setVisible}) => {
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <h4>
                Вы действительно хотите удалить {type}?
            </h4>

            <div className={st.yesOrCancel}>
                <MyButton onClick={() => setAcceptDeleting(true)}>Да</MyButton>
                <MyButton onClick={() => setVisible(false)}>Отменить</MyButton>
            </div>
        </div>
    );
};

export default DeleteModal;