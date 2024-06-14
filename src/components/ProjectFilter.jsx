import React, {useEffect, useState} from 'react';
import Select from "react-select";

const ProjectFilter = ({filter, setFilter}) => {
    const [selectedOption, setSelectedOption] = useState({value: '', label: ''});

    const update = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

    useEffect(() => {
        setFilter({...filter, sort: selectedOption.value})
    },[selectedOption])

    return (
        <div style={{display: "flex", justifyContent:"end"}}>
            {/*поиск*/}
            <input className="filter" style={{marginRight: "20px"}}
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder = "Поиск..."
                name="searchProject"
            />

            <div style={{
                width: "200px",
                fontSize: "13px"}}>
                <Select
                    value={selectedOption}
                    onChange={update}
                    placeholder="Сортировка по"
                    options={[
                        {value: 'name', label: "По названию"},
                    ]}
                />
            </div>
        </div>
    );
};

export default ProjectFilter;