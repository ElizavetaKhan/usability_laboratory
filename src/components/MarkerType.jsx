import React, {useEffect, useRef, useState} from 'react';

const MarkerType = (props) => {
    const [isActive, setIsActive] = useState(false);
    const buttonRef = useRef(null);

    const handleClick = () => {
        setIsActive(true);

        if (props.type === "2") {
            props.setIsAllMarkers(true);
        } else if (props.chooseType) {
            props.chooseType(props.color, props.id);
        } else {
            props.templateForAddMarker(props.color, props.id);
        }
    };

    const handleOutsideClick = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target) && event.target.className === "marker") {
            setIsActive(false);
        }
    };

    useEffect(() => {
        if (props.id === 0) {
            setIsActive(true);
        }

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <button className="marker"
                ref={buttonRef}
                onClick={(props.id === "1" && props.type === "0") ? undefined : handleClick}
                onMouseEnter={(props.id === "1" && props.type === "0") ? () => props.mouseCheck(true) : undefined}
                onMouseLeave={(props.id === "1" && props.type === "0") ? () => props.mouseCheck(false) : undefined}
                style={{
                    color: ((isActive && (props.type === "2")) || props.type !== "2") ? "black" : "rgba(0, 0, 0, 0.4)",
                    opacity: (isActive || (props.type === "2")) ? 1 : 0.5,
                    fontWeight: props.type === "2" ? "bold" : "",
                    letterSpacing: props.type === "2" ? "3px" : "",
                    background: props.color,
                    fontSize: props.type !== "0" ? "10px" : "12px",
                    width: props.type !== "0" ? "90px" : "120px",
                    marginRight: props.type !== "0" ? "0" : "10px",
                    marginBottom: props.type !== "0" ? "5px" : "",
                    padding: props.type !== "0" ? "8px" : "10px",
                    textAlign: props.type !== "0" ? "left" : "center",
                    borderRadius: props.type !== "0" ? "0 8px 8px 0" : "8px 8px 0 0"}}>
            {props.text}
        </button>
    );
};

export default MarkerType;