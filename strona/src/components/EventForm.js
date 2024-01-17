// EventForm.js
import React, { useState } from 'react';

function EventForm({ addEvent }) {
    const [eventData, setEventData] = useState({ date: '', description: '' });

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEvent(eventData); // Funkcja dodająca wydarzenie
        setEventData({ date: '', description: '' }); // Resetowanie formularza
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="date"
                name="date"
                value={eventData.date}
                onChange={handleChange}
            />
            <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
            />
            <button type="submit">Dodaj Wydarzenie</button>
        </form>
    );
}

export default EventForm;
