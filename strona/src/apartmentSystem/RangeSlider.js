import React from 'react';
import './apartmentOnList.css';
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
                <input className='smallerInput' value={range[0]} placeholder={range[0]} onChange={handleFromChange}/>
                ―
                <input className='smallerInput' value={range[1]} placeholder={range[1]} onChange={handleToChange}/>
            </Stack>
        </div>
    );
};

export default ValueRange;