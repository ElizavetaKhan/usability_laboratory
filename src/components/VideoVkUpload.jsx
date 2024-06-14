import React, {useEffect, useState} from 'react';
import ProjectService from "../API/ProjectService";
import {useParams} from "react-router-dom";
import VkAPIServise from "../API/vkAPIServise";
import Cookies from "js-cookie";
import Loader from "./UI/loader/loader";
import cross from "./images/crossBlack.png";

const VideoVkUpload = ({currentSession, setCurrentSession, setChangeVideo, setWasAddedVideo}) => {
    const params = useParams();
    // ID ГРУППЫ ЛАБОРАТОРИИ
    const idGROUP = 225814852;
    const [isHasAccess, setIsHasAccess] = useState(false);
    const [isNotReadyVideo, setIsNotReadyVideo] = useState(false);
    const [isReadyVideo, setIsReadyVideo] = useState(false);

    // id загруженного видео
    const [videoID, setVideoID] = useState(null);
    const [link, setLink] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Cookies.get('access_token')) {
            getGroups();
        }
    }, [Cookies.get('access_token')]);

    useEffect(() => {
        if (isHasAccess && file) {
            getUploadLinkAndSend();
        } else if (file) {
            alert("У вас нет доступа в группе Юзабилити-лаборатория университета ИТМО в ВК, запросите доступ");
        }
    }, [file]);

    useEffect(() => {
        if (videoID && !isReadyVideo) {
            getPlayer();
        }
    }, [videoID, isNotReadyVideo, isReadyVideo]);

    useEffect(() => {
        if (link) {
            sendToDB();
        }
    }, [link]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleVKAuthorization = async () => {
        await VkAPIServise.exchangeTokenToAccessToken(params.name, params.id, currentSession.id_session);
    }

    const getUploadLinkAndSend = async () => {
        const r = await VkAPIServise.getUploadLink(idGROUP);

        const formData = new FormData();
        formData.append('video_file', file);
        setIsLoading(true);

        const response = await fetch(r.response.upload_url, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        setVideoID(data.video_id);
    }

    const getGroups = async () => {
        const r = await VkAPIServise.getGroups(Cookies.get('access_token'));
        r.response.items.map((item) => {
            if (item === idGROUP) {
                return setIsHasAccess(true);
            }
            return null
        })
    };


    const getPlayer = async () => {
        try {
            const r = await VkAPIServise.getVideoPlayerLink(idGROUP, videoID);
            if (r && r.response && r.response.items && r.response.items[0].restriction) {
                setIsNotReadyVideo(!isNotReadyVideo);

            } else if (r && r.response && r.response.items) {
                const player = r.response.items[0].player;
                if (player) {
                    setLink(`${player}&js_api=1`);
                    setIsReadyVideo(true);
                } else {
                    console.error('Player not found in the response:', r);
                }
            } else {
                console.error('Invalid response structure:', r);
                setIsLoading(false)
                alert("Попробуйте еще раз");
            }
        } catch (error) {
            console.error('Error fetching video player link:', error);
        }
    }

    // ОТПРАВКА ССЫЛКИ В БАЗУ
    const sendToDB = async () => {
        if (currentSession.videoURL) {
            const r = await ProjectService.changeVideoInSession(currentSession.id_session, link)
            if (r) {
                alert(r.ERROR);
            } else {
                setIsLoading(false);
                setCurrentSession({...currentSession, videoURL: link});
                setChangeVideo(false);
                setWasAddedVideo(true)
            }

        } else {
            const r = await ProjectService.uploadVideoLink(currentSession.id_session, link)
            if (r) {
                alert(r.ERROR);
            } else {
                setIsLoading(false);
                setCurrentSession({...currentSession, videoURL: link});
            }
        }


    }

    return (
        <>
            {isLoading
                ? <Loader/>
                : <>
                    {currentSession.videoURL
                        ? <button
                            className="buttInProjInfo"
                            onClick={() => setChangeVideo(false)}
                            style={{
                                backgroundImage: `url(${cross})`,
                                margin: '8px',
                                position: "absolute",
                                alignSelf: "flex-end",
                                width: "25px",
                                height: "25px",
                                backgroundColor: "#AFAFAF !important",
                                borderRadius: "15px",
                                cursor: "pointer"
                            }}>
                        </button>

                        : <></>
                    }

                    {Cookies.get('access_token')
                        ? <>
                            <input
                                type="file"
                                id="fileInput"
                                onChange={handleFileChange}
                                style={{display: "none"}}
                            />
                            <label htmlFor="fileInput" className="authButton" style={{marginTop: "40%"}}>
                                {currentSession.videoURL ? "Выберите новый видеофайл" : "Выберите видеофайл"}
                            </label>
                        </>
                        : <button className="authButton" style={{marginTop: "40%"}} onClick={handleVKAuthorization}>
                            {currentSession.videoURL ? "Авторизоваться через VK для загрузки нового видео" : "Авторизоваться через VK для загрузки видео"}
                        </button>
                    }
                </>
            }
        </>
    );
};

export default VideoVkUpload;