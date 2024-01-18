import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Tab, Tabs, Card, Row, Col, Modal, Form, Button} from 'react-bootstrap';
import { ApartmentManager } from './apartmentManager';
import './apartmentOnList.css';
import TimelineItem from '../components/Timeline.js';


export function ApartmentView(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments, addEventToApartment, updateTotalAmount } = ApartmentManager();

    const apartment = apartments ? apartments.find(apartment => apartment.id === parseInt(id)) : null;

    const [key, setKey] = useState('general');
    const [showZoomedImageModal, setShowZoomedImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newEvent, setNewEvent] = useState({ date: '', description: '', title:'', amount: '' });
    const [eventDescription, setEventDescription] = useState('');
    const [events, setEvents] = useState([]);
    const [isAmountEnabled, setIsAmountEnabled] = useState(false);
    const [amount, setAmount] = useState(0);

    // const handleAddEvent = () => {
    //     const newEvent = new Event(newEvent.description, new Date(newEvent.date));
    //     addEventToApartment(apartment.id, newEvent);
    //     setNewEvent({ date: '', description: '' });
    // };


    useEffect(() => {
        const currentApartment = apartments.find(apartment => apartment.id === parseInt(id));
        if (currentApartment && currentApartment.events) {
            setEvents(currentApartment.events);
        }
    }, [apartments, id]);


    const openZoomedImageModal = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowZoomedImageModal(true);
    };
    const closeZoomedImageModal = () => setShowZoomedImageModal(false);

    const handleEventChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    const addEvent = (e) => {
        e.preventDefault();
        const eventToAdd = {
            title: newEvent.title,
            date: newEvent.date,
            description: newEvent.description,
            amount: parseFloat(newEvent.amount) || 0
            // amount: isAmountEnabled ? parseFloat(amount) : null // Dodaj kwotę
        };
        setNewEvent({ title: '', date: '', description: '', amount: '' });
        addEventToApartment(apartment.id, eventToAdd);
        setIsAmountEnabled(false);
        setAmount(0);
    };
    const handleEditApartmentClick = () => {
        console.log("Editing apartment with ID:", apartment.id);
        navigate(`/edit-apartment/${apartment.id}`);
    };

    if (!apartment) {
        return <div>Apartment not found</div>;
    }

    return (
        <Container className="mt-4">
            <span className="hyperlink text12" onClick={() => navigate("/apartments")}>&lt; Go back</span>
            <Row>
                <Col>
                    <h1>Apartment View</h1>
                </Col>
                <Col className="text-end">
                    <Button variant="primary" onClick={handleEditApartmentClick}>Edit Apartment</Button>
                </Col>
            </Row>
            <Tabs id="apartment-tabs" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                <Tab eventKey="general" title="General">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>General Information</Card.Title>
                            <Card.Text><strong>Property Type:</strong> {apartment.propertyType}</Card.Text>
                            <Card.Text><strong>Detailed Type:</strong> {apartment.detailedType}</Card.Text>
                            <Card.Text><strong>Sumaryczna kwota:</strong> {apartment.totalAmount || 0} PLN</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Address</Card.Title>
                            <Card.Text>{apartment.street} {apartment.streetNumber}/{apartment.apartmentNumber}, {apartment.city}, {apartment.zipCode}</Card.Text>
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

                <Tab eventKey="advertisement" title="Advertisement">
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

                <Tab eventKey="details" title="Details">
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
                            <Card.Text><strong>Name:</strong> {apartment.owner?.name}</Card.Text>
                            <Card.Text><strong>Contact:</strong> {apartment.owner?.phone}</Card.Text>
                            <Card.Text><strong>Email:</strong> {apartment.owner?.email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="history" title="History">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>History of events</Card.Title>
                            {/* Formularz dodawania nowego wydarzenia */}
                            <Form onSubmit={addEvent}>
                                <Row className="mb-3">
                                    <Col md={10}>
                                        <Form.Group controlId="formEventTitle">
                                            <Form.Control type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleEventChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="formEventDate">
                                            <Form.Control type="date" name="date" value={newEvent.date} onChange={handleEventChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div className="mb-3 row">
                                    <Form.Group controlId="formEventDescription">
                                        <Form.Control as="textarea" name="description" placeholder="Description" value={newEvent.description} onChange={handleEventChange} required />
                                    </Form.Group>
                                </div>
                                <Row className="mb-3">
                                    <Col md={2}>
                                        <Form.Group controlId="formEventAmountCheckbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="Add amount"
                                                checked={isAmountEnabled}
                                                onChange={(e) => setIsAmountEnabled(e.target.checked)}
                                            />
                                        </Form.Group>
                                    </Col>
                                {isAmountEnabled && (
                                    <Col md={2}>
                                        <Form.Group controlId="formEventAmount">
                                            {/*<Form.Label>Kwota</Form.Label>*/}
                                            <Form.Control
                                                type="number"
                                                name="amount"
                                                placeholder={"Amount"}
                                                value={newEvent.amount}
                                                onChange={handleEventChange}
                                                min="0"
                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                )}

                                </Row>
                                <Button variant="primary" type="submit" className="mt-2">Add event</Button>
                            </Form>

                            <div className="timeline">
                                {[...apartment.events].reverse().map((event, index) => (
                                    <TimelineItem key={index} event={event} />
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>
            {/* Modal do wyświetlenia powiększonego zdjęcia */}
            <Modal show={showZoomedImageModal} onHide={closeZoomedImageModal} size="lg">
                <Modal.Body>
                    <img src={selectedImage} alt="Powiększone zdjęcie mieszkania" className="img-fluid" />
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default ApartmentView;