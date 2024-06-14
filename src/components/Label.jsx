import React from 'react';

const Label = ({label, duration, setMarkerForHighlight, relocationMarker}) => {
    const time = label.secTime / duration * 100;

    return (
        <div style={{ position: "relative", zIndex: "4"}}>
            <div
                onClick={relocationMarker ? () => relocationMarker(label) : undefined}
                onMouseEnter={() => setMarkerForHighlight(label.id_marker)}
                onMouseLeave={() => setMarkerForHighlight(null)}
                style={{
                    position: "absolute",
                    zIndex: "1",
                    width: "7px",
                    height: "15px",
                    backgroundColor: label.color,
                    cursor: "pointer",
                    left: `${time}%`
                }}>

            </div>
        </div>
    );
};

export default Label;