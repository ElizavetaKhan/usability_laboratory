import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/myButton";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import ProjectService from "../API/ProjectService";

const AuthForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [isReg, setIsReg] = useState(false);

    const router = useNavigate();

    const auth = async (e) => {
        e.preventDefault();
        const r = await ProjectService.authorization(login, password)
        if (!r) {
            router('/projects');
        } else {
            alert(r.ERROR);
        }
    }

    const reg = async (e) => {
        e.preventDefault();
        const r = await ProjectService.registration(login, password)
        if (!r) {
            router('/projects');
        } else {
            alert(r.ERROR);
        }
    }

    const swapRegAndLog = (e) => {
        e.preventDefault();
        setIsReg(!isReg)
    }

    return (
        <form>
            <MyInput
                value={login}
                onChange={e => setLogin(e.target.value)}
                type="text"
                name="login"
                placeholder="Логин"
            />

            <div>
                <MyInput
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type={passwordShown ? 'text' : 'password'}
                    name="password"
                    placeholder="Пароль"
                />

                <i onClick={() => setPasswordShown(!passwordShown)}>
                    {passwordShown ? <FaEye/> : <FaEyeSlash/>}
                </i>
            </div>

            {isReg
                ?
                <>
                    <MyButton onClick={reg}>Зарегистрироваться</MyButton>
                    <section>
                        <p>Уже есть аккаунт?</p>
                        <button onClick={swapRegAndLog}>Войти</button>
                    </section>
                </>

                :
                <>
                    <MyButton onClick={auth}>Войти</MyButton>
                    <section>
                        <p>Нет аккаунта?</p>
                        <button onClick={swapRegAndLog}>Зарегистрироваться</button>
                    </section>
                </>
            }
        </form>
    );
};

export default AuthForm;