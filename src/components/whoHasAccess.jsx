import React from 'react';
import cross from "./images/crossBlack.png";

const WhoHasAccess = ({access, myAccess, dropAccess}) => {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <h4 style={{width: "fit-content"}}> {access.login} – {access.access_type} </h4>
            {myAccess === "редактор"
                ? <button
                    className="buttInProjInfo"
                    onClick={() => dropAccess(access.login)}
                    style={{
                        backgroundImage: `url(${cross})`,
                        width: '11px',
                        height: '11px',
                    }}>
                </button>
                : <></>
            }
        </div>
    );
};

export default WhoHasAccess;