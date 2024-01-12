import React from 'react';
import { useApartments } from '../contexts/ApartmentContext';
import {useNavigate} from "react-router-dom";

const ApartmentList = () => {
    const { apartments } = useApartments();
    const navigate = useNavigate()

    const navigateToAddApartment = () => {
        navigate("/add-apartment"); // Załóżmy, że ścieżka do formularza dodawania mieszkania to "/add-apartment"
    };

    return (
        <div>
            {apartments.length === 0 ? (
                <p>Brak dostępnych mieszkań.</p>
            ) : (
                apartments.map((apartment, index) => (
                    <div key={index}>
                        <h3>{apartment.title}</h3>
                        <p>{apartment.description}</p>
                    </div>
                ))
            )}
            <button className="greenButton longerButton" onClick={navigateToAddApartment}>Add New Apartment</button>
        </div>
    );
};

export default ApartmentList;
