import React from 'react';
import {useApartments} from "../contexts/ApartmentContext";

const ApartmentList = () => {
    const { apartments } = useApartments();

    return (
        <div>
            {apartments.map((apartment, index) => (
                <div key={index}>
                    <h3>{apartment.title}</h3>
                    <p>{apartment.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ApartmentList;
