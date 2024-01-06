import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import CustomProgressBar from './CustomProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';


function SelectType({ updateFormData, nextStep }) {
    // Funkcja obsługi wyboru typu nieruchomości
    const handleSelectType = (type) => {
        // Aktualizacja stanu formularza z wybranym typem nieruchomości
        updateFormData({ propertyType: type });
        // Przejście do następnego kroku
        nextStep();
    };

    return (
        <Container className="select-type-container">
            <Row className="justify-content-center text-center">
                <Col>
                    {/*<h1>New Property</h1>*/}
                    <CustomProgressBar currentStep={1} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-center text-center mt-4">
                <Col md={12}>
                    <h2>Dodajmy Twoją nieruchomość</h2>
                    <p>Jakim rodzajem nieruchomości zarządzasz?</p>
                </Col>
            </Row>
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6} lg={5} xl={4}>
                    <Button variant="outline-primary" className="type-button w-100 mb-3" onClick={() => handleSelectType('residential')}>
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                        Mieszkaniowy
                    </Button>
                </Col>
                <Col xs={12} md={6} lg={5} xl={4}>
                    <Button variant="outline-primary" className="type-button w-100" onClick={() => handleSelectType('commercial')}>
                        <FontAwesomeIcon icon="fa-solid fa-building" />
                        Komercyjny
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default SelectType;
