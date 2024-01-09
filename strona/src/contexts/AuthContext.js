// src/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
        // Tutaj możesz dodać logikę zapisywania danych użytkownika, np. w localStorage
    };

    const logout = () => {
        setUser(null);
        // Tutaj możesz dodać logikę czyszczenia danych użytkownika
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
