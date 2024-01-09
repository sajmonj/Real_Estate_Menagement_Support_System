import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import CustomProgressBar from "./CustomProgressBar";

function DetailsForm({ formData, updateFormData, nextStep, prevStep }) {
    const [details, setDetails] = useState({
        area: formData.area || '',
        bathrooms: formData.bathrooms || '',
        kitchens: formData.kitchens || '',
        rooms: formData.rooms || '',
        estimatedRent: formData.estimatedRent || ''
    });
    const [isValid, setIsValid] = useState(true);

    const handleChange = e => {
        setDetails({ ...details, [e.target.name]: e.target.value });
        setIsValid(true);
    };

    const isFormValid = () => {
        return details.area && details.bathrooms && details.kitchens && details.rooms && details.estimatedRent;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isFormValid()) {
            updateFormData(details);
            nextStep();
        } else {
            setIsValid(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center text-center">
                <Col>
                    {/*<h1>New Property</h1>*/}
                    <CustomProgressBar currentStep={4} totalSteps={6} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    <h2 className="text-center mb-4">Property Details</h2>
                    {!isValid && <Alert variant="danger">Please fill in all required fields.</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Area</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="area" value={details.area} onChange={handleChange} placeholder="Enter total area" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Bathrooms</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" name="bathrooms" value={details.bathrooms} onChange={handleChange} placeholder="Number of bathrooms" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Kitchens</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" name="kitchens" value={details.kitchens} onChange={handleChange} placeholder="Number of kitchens" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Rooms</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="number" name="rooms" value={details.rooms} onChange={handleChange} placeholder="Number of rooms" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>Estimated Rent</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" name="estimatedRent" value={details.estimatedRent} onChange={handleChange} placeholder="Estimated rent price" />
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

export default DetailsForm
