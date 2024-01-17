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

    const [apartmentData, setApartmentData] = useState(apartment || {});

    useEffect(() => {
        if (!apartment) {
            // Handle apartment not found
            navigate('/apartments');
        }
    }, [apartment, navigate]);

    const handleChange = (e) => {
        setApartmentData({ ...apartmentData, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        updateApartment(id, apartmentData);
        navigate(`/apartment/${id}`);
    };

    return (
        <Container>
            <h1>Edit Apartment</h1>
            <Form onSubmit={handleSubmit}>
                {/* Form fields for editing apartment */}
                <Button type="submit">Save Changes</Button>
            </Form>
        </Container>
    );
}

export default EditApartment;
