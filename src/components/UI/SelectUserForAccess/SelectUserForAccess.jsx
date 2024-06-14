import React, {useEffect, useState} from 'react';
import Select from "react-select";

const SelectUserForAccess = (props) => {
    const [selectedOption, setSelectedLogin] = useState(null);

    const update = (selectedOption) => {
        setSelectedLogin(selectedOption)
    }

    useEffect(() => {
        props.setLogin(selectedOption)
    },[selectedOption])

    return (
        <Select
            options={props.users}
            value={selectedOption}
            placeholder="Введите логин"
            onChange={update}
            isSearchable
        />
    );
};

export default SelectUserForAccess;