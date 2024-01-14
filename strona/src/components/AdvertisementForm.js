import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import CustomProgressBar from "./CustomProgressBar";

function AdvertisementForm({ formData, updateFormData, nextStep, prevStep }) {
    const [adData, setAdData] = useState({
        adTitle: formData.adTitle || '',
        adDescription: formData.adDescription || '',
    });

    const handleChange = e => {
        setAdData({ ...adData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateFormData(adData);
        nextStep(); // Przejście do strony podsumowania
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center text-center">
                <Col>
                    <CustomProgressBar currentStep={7} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tytuł ogłoszenia</Form.Label>
                            <Form.Control
                                type="text"
                                name="adTitle"
                                value={adData.adTitle}
                                onChange={handleChange}
                                placeholder="Wprowadź tytuł ogłoszenia"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Opis ogłoszenia</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="adDescription"
                                value={adData.adDescription}
                                onChange={handleChange}
                                placeholder="Wprowadź opis ogłoszenia"
                                rows={18}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" className="me-2" onClick={prevStep}>Wstecz</Button>
                            <Button variant="primary" type="submit">Zatwierdź</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AdvertisementForm;
