import React, {useEffect, useState} from 'react';
import '../styles/uploadFile.css'
import UploadLinkField from "./uploadLinkField";
import Loader from "./UI/loader/loader";
import Player from "./Player";
import ProjectService from "../API/ProjectService";

const LinkOrPlayerBlock = ({playerRef, markers, videoURLFromDB, currentSession, setCurrentTime}) => {
    const [videoURL, setVideoURL] = useState('');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (videoURLFromDB) {
            setVideoURL(videoURLFromDB);
        }
    }, [videoURLFromDB]);

    // ОТПРАВКА ССЫЛКИ В БАЗУ
    const sendToDB = async (url) => {
        const r = await ProjectService.uploadVideoLink(currentSession.id_session,url)
        if (r) {
            alert(r.ERROR);
        } else {
            setVideoURL(url);
        }
    }

    return (
        <div className="uploadField" style={{height: videoURL ? '' : '400px', backgroundColor: videoURL ? '' : "#E1E1E1"}}>
            {!videoURL && !videoURLFromDB
                ? <UploadLinkField
                    sendToDB={sendToDB}/>

                : <>
                    {!isReady &&
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Loader/>
                        </div>
                    }

                    <Player
                        style={{ display: isReady ? 'block' : 'none' }}
                        videoURL={videoURL}
                        isReady={isReady}
                        setIsReady={setIsReady}
                        playerRef={playerRef}
                        markers={markers}
                        setCurTime={setCurrentTime}
                    />
                </>
            }
        </div>
    );
};

export default LinkOrPlayerBlock;