import React, {useState} from 'react';
import profile from "./profile.png";
import st from './customHeader.module.css'
import Cookies from "js-cookie";

const CustomHeader = ({login}) => {
    const [onMouse, setOnMouse] = useState(false);

    const exit = () => {
        Cookies.remove('token');

        if (Cookies.get('access_token')) {
            Cookies.remove('access_token')
        }
        if (Cookies.get('OAuth-token')) {
            Cookies.get('OAuth-token')
        }
        if (Cookies.get('login')) {
            Cookies.get('login')
        }

        window.location.reload()
    }

    return (
        <header className={st.header}>
            <div className={st.child}
                 onMouseEnter={() => setOnMouse(true)}
                 onMouseLeave={() => setOnMouse(false)}>
                    <h4 style={{marginRight: "15px", color: "#E1E1E1"}}> {login} </h4>
                    <img src={profile} alt="profile"/>
            </div>

            {onMouse
                ? <button
                    onMouseEnter={() => setOnMouse(true)}
                    onMouseLeave={() => setOnMouse(false)}
                    onClick={exit}>
                        Выйти
                </button>

                : <></>
            }
        </header>
    );
};

export default CustomHeader;