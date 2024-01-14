import React, {useRef, useState} from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import CustomProgressBar from "./CustomProgressBar";

function OwnerForm({ formData, updateFormData, nextStep, prevStep, userInfo }) {
    const ownerRef = useRef({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
    });
    const [isOwner, setIsOwner] = useState(null); // null, true, false
    const [isValid, setIsValid] = useState(true);

    const handleChange = e => {
        ownerRef.current = ({ ...ownerRef.current, [e.target.name]: e.target.value });
        console.log("Owner",ownerRef.current);
        setIsValid(true);
    };

    const isFormValid = () => {
        const owner = ownerRef.current;
        return (isOwner === false && owner.name && owner.email && owner.phone) || isOwner === true;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (isFormValid()) {
            if (isOwner === true) {
                ownerRef.current = {
                    id: userInfo.id,
                    name: userInfo.firstname + ' ' + userInfo.lastname,
                    email: userInfo.email,
                    password: userInfo.password,
                };
                //console.log("USER", userInfo);
                //console.log("OWNER", ownerRef.current);
                updateFormData({ name: userInfo.name, email: userInfo.email, phone: userInfo.phone });
            } else {
                updateFormData(ownerRef.current);
            }
            console.log("FORMDATA", formData);
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
                                        className="custom-btn"
                                    >
                                        <FontAwesomeIcon icon={faUser} className="me-2" /> Ja jestem właścicielem
                                    </Button>
                                    <Button
                                        variant={isOwner === false ? "primary" : "outline-primary"}
                                        onClick={() => setIsOwner(false)}
                                        className="custom-btn"
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
                                                value={ownerRef.current.name}
                                                onChange={handleChange}
                                                placeholder="Imię i nazwisko "
                                                className="mb-2"
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={ownerRef.current.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                className="mb-2" // Dodano margines poniżej
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                value={ownerRef.current.phone}
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
                    padding: .75rem 1.5rem;
                    margin: 1rem .5rem;
                }
                `}
            </style>
        </Container>
    );
}

export default OwnerForm;
