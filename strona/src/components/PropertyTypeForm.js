import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faBuilding, faStore, faShoppingCart, faWarehouse, faParking, faTree, faEllipsisH, faHome, faCity, faHouseDamage, faUsers, faDoorClosed, faGraduationCap, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import CustomProgressBar from "./CustomProgressBar";

function PropertyTypeForm({ formData, updateFormData, nextStep }) {
    const handleSelection = (type) => {
        updateFormData({ detailedType: type });
        nextStep();
    };

    // Definicja opcji wraz z odpowiednimi ikonami
    const options = formData.propertyType === 'commercial'
        ? [
            { type: 'Industrial', icon: faIndustry, label: 'Industrial' },
            { type: 'Industrial', icon: faBuilding, label: 'Office' },
            { type: 'Retail', icon: faStore, label: 'Retail' },
            { type: 'Shopping Mall', icon: faShoppingCart, label: 'Shopping Mall' },
            { type: 'Warehouse', icon: faWarehouse, label: 'Warehouse' },
            { type: 'Parking', icon: faParking, label: 'Parking' },
            { type: 'Land', icon: faTree, label: 'Land' },
            { type: 'Other', icon: faEllipsisH, label: 'Other' },
        ]
        : [
            { type: 'House', icon: faHome, label: 'House' },
            { type: 'Apartment', icon: faBuilding, label: 'Apartment' },
            { type: 'Condominium', icon: faCity, label: 'Condominium' },
            { type: 'Townhouse', icon: faHouseDamage, label: 'Townhouse' },
            { type: 'Room', icon: faDoorClosed, label: 'Room' },
            { type: 'Other', icon: faEllipsisH, label: 'Other' },
        ];

    return (
        <Container className="select-type-container">
            <Row className="justify-content-center text-center">
                <Col>
                    <CustomProgressBar currentStep={2} totalSteps={7} />
                </Col>
            </Row>
            <Row className="justify-content-center text-center mt-4">
                <Col md={12}>
                    <h2>Dodajmy Twoją nieruchomość</h2>
                    <p>Jaki jest to typ nieruchomości?</p>
                </Col>
            </Row>
            <Row className="justify-content-center text-center mt-4">
                {options.map(({ type, icon }) => (
                    <Col xs={12} md={6} lg={5} xl={4} className="mb-3" key={type}>
                        <Button
                            variant="outline-primary"
                            className="type-button w-100"
                            onClick={() => handleSelection(type)}
                        >
                            <FontAwesomeIcon icon={icon} className="me-2" />
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default PropertyTypeForm;
