import React from 'react';
import '../style/apartmentOnList.css';
import Stack from "react-bootstrap/Stack";

const ValueRange = ({range, setRange, maxValue}) => {

    const handleFromChange = (e) => {
        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
        setRange((prevRange) => [value, prevRange[1]]);
    };

    const handleToChange = (e) => {
        const value = e.target.value === '' ? maxValue : parseFloat(e.target.value);
        setRange((prevRange) => [prevRange[0], value]);
    };

    return (
        <div>
            <Stack direction="horizontal" gap={1}>
                <input className='smallerInput' placeholder={"from: " + range[0]} onChange={handleFromChange}/>
                ―
                <input className='smallerInput' placeholder={"to: " + range[1]} onChange={handleToChange}/>
            </Stack>
        </div>
    );
};

export default ValueRange;
