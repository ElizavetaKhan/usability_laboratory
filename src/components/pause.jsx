import React, {useState} from 'react';

const Pause = ({pause, duration}) => {
    const [showPAUSE, setShowPause] = useState(false);
    const pauseDuration = (pause.end - pause.start) / duration * 100;
    const startPause = pause.start / duration * 100;


    return (
        <div style={{ position: "relative", zIndex: "1"}}>
            {showPAUSE &&
                <div
                    style={{
                        position: "absolute",
                        padding: "2px 5px",
                        fontSize: "12px",
                        zIndex: "2",
                        backgroundColor: "#AFAFAF",
                        borderRadius: "5px",
                        color: "#2B2B2B",
                        top: "-15px",
                        left: `${startPause}%`,
                        textTransform: "uppercase",
                    }}>
                    пауза
                </div>}

            <div
                onMouseEnter={() => setShowPause(true)}
                onMouseLeave={() => setShowPause(false)}
                style={{
                    position: "absolute",
                    zIndex: "1",
                    width: `${pauseDuration}%`,
                    height: "50px",
                    backgroundColor: "#AFAFAF",
                    pointerEvents: "none",
                    left: `${startPause}%`
                }}>

            </div>
        </div>
    );
};

export default Pause;