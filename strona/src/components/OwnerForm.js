import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import CustomProgressBar from "./CustomProgressBar";
import {useNavigate} from "react-router-dom";

function OwnerForm({ formData, updateFormData, nextStep, prevStep, userInfo }) {
    const [ownerData, setOwnerData] = useState({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
    });
    const [isOwner, setIsOwner] = useState(null); // null, true, false
    const [isValid, setIsValid] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOwner) {
            setOwnerData({
                name: userInfo.firstname + ' ' + userInfo.lastname,
                email: userInfo.email,
                phone: userInfo.phone
            });
        }
    }, [isOwner, userInfo]);

    const handleChange = e => {
        setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
        setIsValid(true);
    };

    const isFormValid = () => {
        return (!isOwner && ownerData.name && ownerData.email && ownerData.phone) || isOwner;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isFormValid()) {
            updateFormData(ownerData);
            nextStep();
        } else {
            setIsValid(false);
        }
    };

    return (
        <Container className="mt-5">
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back</span>
            <Row className="justify-content-center text-center">
                <Col>
                    {/*<h1>New Property</h1>*/}
                    <CustomProgressBar currentStep={5} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col lg={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Owner Information</Card.Title>
                            {!isValid && <Alert variant="danger">Please fill in all required fields.</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <div className="d-flex justify-content-around mb-4">
                                    <Button
                                        variant={isOwner === true ? "primary" : "outline-primary"}
                                        onClick={() => setIsOwner(true)}
                                        className="custom-btn ownerform-btn"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="me-2" /> Ja jestem właścicielem
                                    </Button>
                                    <Button
                                        variant={isOwner === false ? "primary" : "outline-primary"}
                                        onClick={() => setIsOwner(false)}
                                        className="custom-btn ownerform-btn"
                                    >
                                        <FontAwesomeIcon icon={faUserTie} className="me-2" /> Ktoś inny jest właścicielem
                                    </Button>
                                </div>
                                {isOwner === false && (
                                    <>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={ownerData.name}
                                                onChange={handleChange}
                                                placeholder="Imię i nazwisko"
                                                className="mb-2"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={ownerData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="mb-2"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={ownerData.phone}
                                                onChange={handleChange}
                                                placeholder="Telefon"
                                            />
                                        </Form.Group>
                                    </>
                                )}

                                <div className="d-flex justify-content-end mt-4">
                                    <Button variant="secondary" className="me-2" onClick={prevStep}>Wstecz</Button>
                                    <Button variant="primary" type="submit">Dalej</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* Style CSS dla przycisków */}
            <style type="text/css">
                {`
                .custom-btn {
                    padding: .5rem 1.5rem;
                    margin: 1rem .5rem;
                    height: 60px;
                    width: 280px;             
                }
                `}
            </style>
        </Container>
    );
}

export default OwnerForm;