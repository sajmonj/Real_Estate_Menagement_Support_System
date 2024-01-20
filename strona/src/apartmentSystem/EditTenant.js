import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditTenant = ({ tenant, onHide, onSave }) => {
    const [editedTenant, setEditedTenant] = useState({ ...tenant });

    const handleChange = (e) => {
        setEditedTenant({ ...editedTenant, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        onSave(editedTenant);
        onHide();
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit {editedTenant.firstName} {editedTenant.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={editedTenant.address}
                            onChange={handleChange}
                        />
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={editedTenant.city}
                            onChange={handleChange}
                        />
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="postalCode"
                            value={editedTenant.postalCode}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={editedTenant.phone}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            value={editedTenant.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>End partnership date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            value={editedTenant.endDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    {/* Dodaj inne pola według potrzeb */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTenant;
