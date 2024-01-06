import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import CustomProgressBar from "./CustomProgressBar";

function AddressForm({ formData, updateFormData, nextStep, prevStep }) {
    const [address, setAddress] = useState({
        street: formData.street || '',
        streetNumber: formData.streetNumber || '',
        apartmentNumber: formData.apartmentNumber || '',
        city: formData.city || '',
        zipCode: formData.zipCode || ''
    });
    const [isValid, setIsValid] = useState(true);

    const handleChange = e => {
        setAddress({ ...address, [e.target.name]: e.target.value });
        setIsValid(true);
    };

    const isFormValid = () => {
        return address.street && address.streetNumber && address.city && address.zipCode;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isFormValid()) {
            updateFormData(address);
            nextStep();
        } else {
            setIsValid(false);
        }
    };


    return (
        <Container className="mt-5">
            <Row className="justify-content-center text-center">
                <Col>
                    <CustomProgressBar currentStep={3} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    <h2 className="text-center mb-4">Address Information</h2>
                    {!isValid && <Alert variant="danger">Please fill in all required fields.</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formGridAddress">
                            <Form.Label column sm={2}>Street</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="street" value={address.street} onChange={handleChange} placeholder="Enter street" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formGridAddressNumber">
                            <Form.Label column sm={2}>Number</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="streetNumber" value={address.streetNumber} onChange={handleChange} placeholder="Enter number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formGridApartmentNumber">
                            <Form.Label column sm={2}>Apartment</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="apartmentNumber" value={address.apartmentNumber} onChange={handleChange} placeholder="Enter apartment number" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formGridCity">
                            <Form.Label column sm={2}>City</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="city" value={address.city} onChange={handleChange} placeholder="Enter city" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formGridZip">
                            <Form.Label column sm={2}>Zip</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="zipCode" value={address.zipCode} onChange={handleChange} placeholder="Enter zip code" />
                            </Col>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="me-2" onClick={prevStep}>Wstecz</Button>
                            <Button variant="primary" type="submit">Dalej</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AddressForm;
