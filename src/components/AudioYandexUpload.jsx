import React, {useEffect, useRef, useState} from 'react';
import YandexAuthorization from "./yandexAuthorization";
import Cookies from "js-cookie";
import YandexAPI from "../API/yandexAPI";
import Loader from "./UI/loader/loader";
import ProjectService from "../API/ProjectService";
import {useParams} from "react-router-dom";

const AudioYandexUpload = ({currentSession, setAudios, audios, setWasAddedAudio}) => {
    const [isAccessUploadAudio, setIsAccessUploadAudio] = useState(false);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(null);
    const [wantUpload, setWantUpload] = useState(false);
    const ref = useRef(null)
    const params = useParams();

    useEffect(() => {
        if (Cookies.get('OAuth-token') && file) {
            getUploadLinkAndSend();
        }
    }, [file]);

    useEffect(() => {
        if (name && publishFile()) {
            sendToDB();
        }
    }, [name]);

    useEffect(() => {
        if (isAccessUploadAudio) {
            Cookies.set('id_session', currentSession.id_session, {expires: 1});
            Cookies.set('id_project', params.id, {expires: 1});
            Cookies.set('project_name', params.name, {expires: 1});
        }
    }, [isAccessUploadAudio]);

    // useEffect(() => {
    //     if (wantUpload) {
    //         document.addEventListener('click', ClickOutsideAudio);
    //     } else {
    //         document.removeEventListener('click', ClickOutsideAudio);
    //     }
    // }, [wantUpload]);
    //
    // const ClickOutsideAudio = (event) => {
    //     if (event.target.className !== "authButton" && (ref.current && !ref.current.contains(event.target))) {
    //         setWantUpload(false);
    //     }
    // };

    const sendToDB = async () => {
        const r = await ProjectService.uploadAudioName(currentSession.id_session, name);

        if (r) {
            alert(r.ERROR);
        } else {
            setIsLoading(false);
            setAudios([...audios, {
                shift: null,
                audio_name: name,
                comment: null,
            }])
            setWasAddedAudio(true);
        }
    }

    const publishFile = async () => {
        const r = await YandexAPI.publishAudio(name);
        if (r.message) {
            alert(r.message);
            return false;
        } else {
            return true;
        }
    }

    const getUploadLinkAndSend = async () => {
        const r = await YandexAPI.getUploadLink();

        if (!r.data.href) {
            alert(r.data.message);
            setFile(null);
        } else {
            setIsLoading(true);
            const response = await fetch(r.data.href, {
                method: 'PUT',
                body: file
            });

            if (response.message) {
                alert(response.message);
                setFile(null);
            } else {
                setName(r.name);
            }
        }
    }

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setWantUpload(false);
    }

    return (
        <div id="containerID" style={{width: "100%", justifyContent: "center", display: "flex"}}>
            {isLoading
                ? <Loader/>
                : <>
                    {Cookies.get('OAuth-token')
                        ? <>
                            {wantUpload
                                ? <>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        onChange={handleFileChange}
                                        style={{display: "none"}}
                                    />
                                    <label htmlFor="fileInput" className="authButton" ref={ref}>
                                        Выберите файл
                                    </label>
                                </>
                                : <button className="authButton" onClick={() => setWantUpload(true)}>
                        Загрузить аудиофайл
                        </button>
                    }
                </>
                : <div style={{display: "flex", flexDirection: "column"}}>
                        {isAccessUploadAudio
                                ? <YandexAuthorization/>
                                : <>
                                    {audios.length !== 0
                                        ? <p style={{padding: "10px 20px", fontSize: "10px"}}>Данная сессия имеет загруженные аудиозаписи, авторизуйтесь в аккаунте с доступом к папке лаборатории для их прослушивания</p>
                                        : <p style={{padding: "10px 20px", fontSize: "10px"}}>Данная сессия пока не имеет загруженных аудиозаписей, авторизуйтесь в аккаунте с доступом к папке лаборатории, если хотите добавить их</p>
                                    }
                                    <button className="authButton" onClick={() => setIsAccessUploadAudio(true)}>
                                        Авторизоваться в Яндексе
                                    </button>
                                </>
                            }
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default AudioYandexUpload;