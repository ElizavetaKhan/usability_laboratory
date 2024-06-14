import React, {useState} from 'react';
import upload from "./images/file_upload.png";

const UploadLinkField = ({sendToDB}) => {
    const [input, setInput] = useState('');

    return (
        <>
            <img
                src={upload}
                alt="upload"/>

            <input
                className="filter"
                value={input}
                name="inputVideofile"
                onChange={e => setInput(e.target.value)}
                placeholder="Вставьте ссылку на видеофайл..."
                style={{width: "240px"}}>
            </input>

            <button onClick={() => sendToDB(input)}>
                Загрузить
            </button>
        </>
    );
};

export default UploadLinkField;