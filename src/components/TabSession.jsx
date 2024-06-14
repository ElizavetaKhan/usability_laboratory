import React from 'react';
import "../styles/sessionsHeader.css"

const TabSession = (props) => {
    const selectTab = {
        backgroundColor: props.session.isSel ? '#545454' : '#343434',
    };
    const click = () => {
        props.open(props.session);
    }

    return (
        <button style={selectTab} className="tab" onClick={() => click()}>
            {props.session.respondent}
        </button>
    );
};

export default TabSession;