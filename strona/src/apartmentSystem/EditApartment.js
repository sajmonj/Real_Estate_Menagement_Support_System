// EditApartment.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { ApartmentManager } from './apartmentManager';

export function EditApartment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments, updateApartment } = ApartmentManager();
    const apartment = apartments.find(ap => ap.id === parseInt(id));
    const [apartmentData, setApartmentData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!apartment && !isLoading) {
            navigate('/apartments');
        } else if (apartment) {
            setApartmentData({ ...apartment });
            setIsLoading(false);
        }
    }, [apartment, isLoading, navigate]);

    const handleChange = (e) => {
        setApartmentData({ ...apartmentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateApartment(id, apartmentData);
        navigate(`/apartment/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Edit Apartment</h1>
            <Form onSubmit={handleSubmit}>
                {/* Form fields for editing apartment */}
                <Form.Group controlId="formApartmentTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={apartmentData.title || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formApartmentDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={apartmentData.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* Dodaj więcej pól formularza dla innych atrybutów mieszkania, np. adres, typ nieruchomości, itp. */}
                {/* Przykład: */}
                <Form.Group controlId="formApartmentAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        name="address"
                        value={apartmentData.address || ''}
                        onChange={handleChange}
                    />
                </Form.Group>

                {/* ...inne pola... */}

                <Button type="submit">Save Changes</Button>
            </Form>

        </Container>
    );
}

export default EditApartment;
