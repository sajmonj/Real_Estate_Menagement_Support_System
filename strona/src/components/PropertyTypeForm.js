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
            { type: 'przemysłowe', icon: faIndustry, label: 'Industrial' },
            { type: 'biura', icon: faBuilding, label: 'Office' },
            { type: 'sprzedaż detaliczna', icon: faStore, label: 'Retail' },
            { type: 'centrum handlowe', icon: faShoppingCart, label: 'Shopping Mall' },
            { type: 'magazynowy', icon: faWarehouse, label: 'Warehouse' },
            { type: 'parking', icon: faParking, label: 'Parking' },
            { type: 'grunt', icon: faTree, label: 'Land' },
            { type: 'inne', icon: faEllipsisH, label: 'Other' },
        ]
        : [
            { type: 'dom', icon: faHome, label: 'House' },
            { type: 'kawalerka', icon: faBuilding, label: 'Apartment' },
            { type: 'mieszkanie na pokoje', icon: faCity, label: 'Condominium' },
            { type: 'townhouse', icon: faHouseDamage, label: 'Townhouse' },
            { type: 'kwatery', icon: faDoorClosed, label: 'Room' },
            { type: 'inne', icon: faEllipsisH, label: 'Other' },
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
