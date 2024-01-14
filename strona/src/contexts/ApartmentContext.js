// src/ApartmentContext.js

import React, { createContext, useContext, useState } from 'react';

const ApartmentContext = createContext();

export const useApartments = () => useContext(ApartmentContext);

export const ApartmentProvider = ({ children }) => {
    const [apartments, setApartments] = useState([]);

    const addApartment = (apartment) => {
        setApartments([...apartments, apartment]);
    };

    return (
        <ApartmentContext.Provider value={{ apartments, addApartment }}>
            {children}
        </ApartmentContext.Provider>
    );
};
