import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomProgressBar from './CustomProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router-dom";


function SelectType({ updateFormData, nextStep }) {
    const navigate= useNavigate();
    // Funkcja obsługi wyboru typu nieruchomości
    const handleSelectType = (type) => {
        // Aktualizacja stanu formularza z wybranym typem nieruchomości
        updateFormData({ propertyType: type });
        // Przejście do następnego kroku
        nextStep();
    };

    return (
        <Container className="select-type-container">
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back</span>
            <Row className="justify-content-center text-center">
                <Col>
                    {/*<h1>New Property</h1>*/}
                    <CustomProgressBar currentStep={1} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-center text-center mt-4">
                <Col md={12}>
                    <h2>Let's Add Your Property</h2>
                    <p>What type of property do you manage?</p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6} lg={5} xl={4}>
                    <Button variant="outline-primary" className="type-button w-100 mb-3" onClick={() => handleSelectType('residential')}>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        Residential
                    </Button>
                </Col>
                <Col xs={12} md={6} lg={5} xl={4}>
                    <Button variant="outline-primary" className="type-button w-100" onClick={() => handleSelectType('commercial')}>
                        <FontAwesomeIcon icon="fa-solid fa-building" />
                        Commercial
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SelectType;
