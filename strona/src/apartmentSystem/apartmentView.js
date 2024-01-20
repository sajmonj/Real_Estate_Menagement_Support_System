import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {Container, Tab, Tabs, Card, Row, Col, Modal, Form, Button, Table, CloseButton} from 'react-bootstrap';
import { ApartmentManager } from './apartmentManager';
import '../style/apartmentOnList.css';
import TimelineItem from '../components/Timeline.js';
import TimelineLandlordItem from "../components/TimelineLandlord";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";


export function ApartmentView(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments, addEventToApartment, addLandlordToApartment ,updateTotalAmount } = ApartmentManager();
    const apartment = apartments ? apartments.find(apartment => apartment.id === parseInt(id)) : null;
    const owners = apartment ? apartment.landlords.sort((a,b) => new Date(b.startDate) - new Date(a.startDate)) : null;
    const owner = owners && owners.length > 0
        ? (owners[0].endDate ? {firstName: '-', lastName: '', phone: '-', email: '-'} : owners[0])
        : {firstName: '-', lastName: '', phone: '-', email: '-'};
    const [key, setKey] = useState('general');
    const [showZoomedImageModal, setShowZoomedImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [newEvent, setNewEvent] = useState({ date: '', description: '', title:'', amount: '' });
    const [newLandlord, setNewLandlord] = useState({ id: '', firstName: '', lastName: '', phone: '',
        email: '', address: '', city: '', postalCode: '', startDate: '', endDate: '', documents: [] })
    const [eventDescription, setEventDescription] = useState('');
    const [events, setEvents] = useState([]);
    const [isAmountEnabled, setIsAmountEnabled] = useState(false);
    const [amount, setAmount] = useState(0);
    const [isLandlordHistoryExpanded, setIsLandlordHistoryExpanded] = useState(false);
    const [isEventHistoryExpanded, setIsEventHistoryExpanded] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

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

    const handleLandlordChange = (e) => {
        setNewLandlord({ ...newLandlord, [e.target.name]: e.target.value });
    };

    const handleDocumentsChange = (e) => {
        const newDocuments = Array.from(e.target.files);
        const newDocumentsURLs = newDocuments.map(document => URL.createObjectURL(document));
        setSelectedFiles(prevFiles => [...prevFiles, ...newDocumentsURLs]);
        // handleLandlordChange();
    }

    const handleRemoveFile = index => {
        const newFileList = selectedFiles.filter((_, fileIndex) => fileIndex !== index);
        setSelectedFiles(newFileList);
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

    const addLandlord = (e) => {
        e.preventDefault();
        const landlordToAdd = {
            id: apartment.landlords.length,
            firstName: newLandlord.firstName,
            lastName: newLandlord.lastName,
            phone: newLandlord.phone,
            email: newLandlord.email,
            address: newLandlord.address,
            city: newLandlord.city,
            postalCode: newLandlord.postalCode,
            startDate: newLandlord.startDate,
            endDate: newLandlord.endDate,
            documents: newLandlord.documents
        }
        console.log("landlord",landlordToAdd);
        console.log(landlordToAdd.documents);
        setSelectedFiles([]);
        setNewLandlord({id: '', firstName: '', lastName: '', phone: '', email: '', address: '', city: '', postalCode: '', startDate: '', endDate: '', documents: [] });
        addLandlordToApartment(apartment.id, landlordToAdd);
    }

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
                            {/* Placeholder for Owner Details */}
                            <Card.Text><strong>Name:</strong> {owner.firstName}&nbsp;{owner.lastName} </Card.Text>
                            <Card.Text><strong>Contact:</strong></Card.Text>
                            <Card.Text><strong>Phone:</strong> {owner.phone} </Card.Text>
                            <Card.Text><strong>Email:</strong> {owner.email} </Card.Text>
                        </Card.Body>
                    </Card>
                </Tab>
                <Tab eventKey="history" title="History">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>History of events</Card.Title>
                            <div className="timeline">
                                {[...apartment.events].sort((a,b) => new Date(b.date) - new Date(a.date)).map((event, index) => (
                                    <TimelineItem key={index} event={event} />
                                ))}
                            </div>

                            <Card.Title>
                                <button className="timeline__arrow" onClick={() => setIsEventHistoryExpanded(!isEventHistoryExpanded)} aria-expanded={isEventHistoryExpanded}>
                                    <FontAwesomeIcon icon={faChevronDown} className={`timeline__arrow-icon ${isLandlordHistoryExpanded ? 'expanded' : ''}`} />
                                </button>
                                Enter new event data
                            </Card.Title>
                            {/* Formularz dodawania nowego wydarzenia */}
                            {isEventHistoryExpanded && (
                                <Form onSubmit={addEvent}>
                                    <Row className="mb-3">
                                        <Col md={10}>
                                            <Form.Group controlId="formEventTitle">
                                                <Form.Control type="text" name="title" placeholder="Title" value={newEvent.title} onChange={handleEventChange} required />
                                                <br/>
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
                            )}

                        </Card.Body>
                    </Card>



                        <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>History of landlords</Card.Title>
                            {/* Formularz dodawania nowego  wynajmującego*/}


                            <div className="timeline">
                                {[...apartment.landlords].sort((a,b) => new Date(b.startDate) - new Date(a.startDate)).map((event, index) => (
                                    <TimelineLandlordItem key={index} event={event} />
                                ))}
                            </div>

                            <Card.Title>
                                <button className="timeline__arrow" onClick={() => setIsLandlordHistoryExpanded(!isLandlordHistoryExpanded)} aria-expanded={isLandlordHistoryExpanded}>
                                    <FontAwesomeIcon icon={faChevronDown} className={`timeline__arrow-icon ${isLandlordHistoryExpanded ? 'expanded' : ''}`} />
                                </button>
                                Enter new landlord data
                            </Card.Title>
                            {isLandlordHistoryExpanded && (
                                <Form onSubmit={addLandlord}>
                                    <br/>

                                    <Row className="mb-3">
                                        <Col md={12}>
                                            <Form.Group controlId="formLandlordName">
                                                <Form.Control type="text" name="firstName" placeholder="First Name" value={newLandlord.firstName} onChange={handleLandlordChange} required />
                                                <br/>
                                                <Form.Control type="text" name="lastName" placeholder="Last Name" value={newLandlord.lastName} onChange={handleLandlordChange} required />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group controlId="formLandlordContact">
                                                <br/>
                                                <Form.Control type="text" name="phone" placeholder="Phone number" value={newLandlord.phone} onChange={handleLandlordChange} required />
                                                <br/>
                                                <Form.Control type="text" name="email" placeholder="Email" value={newLandlord.email} onChange={handleLandlordChange} required />
                                                <br/>
                                                <Form.Control type="text" name="address" placeholder="Address" value={newLandlord.address} onChange={handleLandlordChange} required />
                                                <br/>
                                                <Form.Control type="text" name="city" placeholder="City" value={newLandlord.city} onChange={handleLandlordChange} required />
                                                <br/>
                                                <Form.Control type="text" name="postalCode" placeholder="Postal Code" value={newLandlord.postalCode} onChange={handleLandlordChange} required />
                                                <br/>
                                            </Form.Group>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Group controlId="formRentDates">
                                                Start date:
                                                <Form.Control type="date" name="startDate" value={newLandlord.startDate} onChange={handleLandlordChange} required />
                                                <br/>
                                                End date:
                                                <Form.Control type="date" name="endDate" value={newLandlord.endDate} onChange={handleLandlordChange} />
                                                <br/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formDocuments">
                                                Documents:
                                                <Form.Control type="file" name="documents" multiple onChange={handleDocumentsChange} onSubmit={handleLandlordChange} ></Form.Control>
                                            </Form.Group>

                                            <Row>
                                                {selectedFiles.length > 0 && selectedFiles.map((fileURL, index) => (
                                                    <Col xs={6} md={4} key={index} className="mb-3 position-relative">
                                                        <img src={fileURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" />
                                                        <CloseButton
                                                            className="position-absolute top-0 end-0"
                                                            onClick={() => handleRemoveFile(index)}
                                                        />
                                                    </Col>
                                                ))}
                                            </Row>

                                        </Col>
                                    </Row>
                                    <Button variant="primary" type="submit" className="mt-2" >Add landlord</Button>
                                    <br/>
                                    <br/>
                                </Form>
                            )}
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