import React from 'react';
import crush from '../components/images/crush.png'
import AuthForm from "../components/AuthForm";
import cl from "../components/UI/modal/MyModal.module.css";

const Auth = () => {
    return (
        <div className="auth"
             style={{backgroundImage: `url(${crush})`}}>


            <div className={cl.modalContent}>
                <AuthForm/>
            </div>
        </div>
    );
};

export default Auth;