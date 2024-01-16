import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Tab, Tabs, Card, Row, Col, Modal } from 'react-bootstrap';
import { ApartmentManager } from './apartmentManager';
import './apartmentOnList.css';

export function ApartmentView(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments } = ApartmentManager();

    const apartment = apartments.find(apartment => apartment.id === parseInt(id));
    const [key, setKey] = useState('general');
    const [showZoomedImageModal, setShowZoomedImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (!props.loggedIn) navigate('/');
    }, [props.loggedIn, navigate]);

    const openZoomedImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowZoomedImageModal(true);
    };
    const closeZoomedImageModal = () => setShowZoomedImageModal(false);

    if (!apartment) {
        return <div>Apartment not found</div>;
    }

    return (
        <Container className="mt-4">
            <span className="hyperlink text12" onClick={() => navigate("/apartments")}>&lt; Go back to the apartments list</span>
            <h1>Apartment View</h1>

            <Tabs id="apartment-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="general" title="Ogólny">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>General Information</Card.Title>
                            <Card.Text><strong>Property Type:</strong> {apartment.propertyType}</Card.Text>
                            <Card.Text><strong>Detailed Type:</strong> {apartment.detailedType}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Address</Card.Title>
                            <Card.Text>{apartment.street} {apartment.streetNumber}/{apartment.apartmentNumber}, {apartment.city}, {apartment.postalCode}</Card.Text>
                        </Card.Body>
                    </Card>
                    {apartment.photos && (
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Photos</Card.Title>
                                <Row>
                                    {apartment.photos.map((photo, index) => (
                                        <Col key={index} md={4} className="mb-3">
                                            <img src={photo} alt={`Apartment photo ${index}`} className="img-fluid" onClick={() => openZoomedImageModal(photo)} />
                                        </Col>
                                    ))}
                                </Row>
                            </
                                Card.Body>
                        </Card>
                    )}
                </Tab>

                <Tab eventKey="advertisement" title="Ogłoszenie">
                    {apartment.photos && (
                        <Row className="mb-3">
                            {apartment.photos.map((photo, index) => (
                                <Col key={index} md={4} className="mb-3">
                                    <img src={photo} alt={`Apartment photo ${index}`} className="img-fluid" onClick={() => openZoomedImageModal(photo)} />
                                </Col>
                            ))}
                        </Row>
                    )}
                    <Card className="mb-3">
                        <Card.Body>
                            <h5>{apartment.adTitle}</h5>
                            <Card.Text>{apartment.adDescription}</Card.Text>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="details" title="Szczegóły">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Property Details</Card.Title>
                            <Card.Text><strong>Area:</strong> {apartment.area} m2</Card.Text>
                            <Card.Text><strong>Estimated Rent:</strong> {apartment.estimatedRent} PLN</Card.Text>
                            <Card.Text><strong>Rooms:</strong> {apartment.rooms}</Card.Text>
                            <Card.Text><strong>Kitchens:</strong> {apartment.kitchens}</Card.Text>
                            <Card.Text><strong>Bathrooms:</strong> {apartment.bathrooms}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Owner Details</Card.Title>
                            {/* Placeholder for Owner Details */}
                            <Card.Text><strong>Name:</strong> [Owner Name]</Card.Text>
                            <Card.Text><strong>Contact:</strong> [Owner Contact]</Card.Text>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            {/* Modal do wyświetlenia powiększonego zdjęcia */}
            <Modal show={showZoomedImageModal} onHide={closeZoomedImageModal} size="lg">
                <Modal.Body>
                    <img src={selectedImage} alt="Zoomed in apartment photo" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ApartmentView;