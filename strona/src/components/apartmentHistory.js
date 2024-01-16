// apartmentHistory.js
import React from 'react';

export const ApartmentHistory = ({ history }) => {
    return (
        <div>
            <h3>Historia Wydarzeń</h3>
            <ul>
                {history.map((event, index) => (
                    <li key={index}>
                        <p>Data: {event.date}</p>
                        <p>Opis: {event.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
