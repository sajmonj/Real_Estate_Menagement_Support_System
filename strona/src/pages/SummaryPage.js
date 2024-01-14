import React, {useState} from 'react';
import {Card, Container, Tab, Tabs} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "../apartmentSystem/apartmentManager";

function SummaryPage({ formData, clearFormData }) {
    const [key, setKey] = useState('general');
    const navigate = useNavigate();
    const {apartments, registerApartment} = ApartmentManager();
    // const [setShowModal] = useState(false);

    const maxImagesToShow = 4;

    // const openModal = () => setShowModal(true);
    // const closeModal = () => setShowModal(false);
    // const [showImagesModal, setShowImagesModal] = useState(false);
    // const [showZoomedImageModal, setShowZoomedImageModal] = useState(false);
    // const [selectedImage, setSelectedImage] = useState(null);

    // const openImagesModal = () => setShowImagesModal(true);
    // const closeImagesModal = () => setShowImagesModal(false);
    //
    // const openZoomedImageModal = (imageUrl) => {
    //     setSelectedImage(imageUrl);
    //     setShowZoomedImageModal(true);
    // };
    // const closeZoomedImageModal = () => setShowZoomedImageModal(false);

    const handleClearData = () => {
        clearFormData();
        // Dodaj tutaj ewentualne przekierowanie lub inne działania po wyczyszczeniu danych
    };

    const handleSaveToApartmentList = () => {
        console.log(formData);
        console.log('apa', apartments);
        registerApartment(formData);
        console.log("apa2", apartments);
        clearFormData();
        navigate("/apartments");
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-3">Podsumowanie Twojej Nieruchomości</h2>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="general" title="Ogólne">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Informacje Ogólne</Card.Title>
                            <Card.Text><strong>Typ Nieruchomości:</strong> {formData.propertyType}</Card.Text>
                            <Card.Text><strong>Dokładny Typ:</strong> {formData.detailedType}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Adres</Card.Title>
                            <Card.Text><strong>Ulica:</strong> {formData.street}</Card.Text>
                            <Card.Text><strong>Nr ulicy:</strong> {formData.streetNumber}</Card.Text>
                            <Card.Text><strong>Nr mieszkania:</strong> {formData.apartmentNumber}</Card.Text>
                            <Card.Text><strong>Miejscowość:</strong> {formData.city}</Card.Text>
                            <Card.Text><strong>Kod pocztowy:</strong> {formData.zipCode}</Card.Text>
                        </Card.Body>
                    </Card>
                    {/*{formData.photos && formData.photos.length > 0 && (*/}
                    {/*    <Card className="mb-3">*/}
                    {/*        <Card.Body>*/}
                    {/*            <Card.Title>Zdjęcia</Card.Title>*/}
                    {/*            <Row>*/}
                    {/*                {formData.photos.slice(0, maxImagesToShow).map((photoURL, index) => (*/}
                    {/*                    <Col key={index} md={3} className="mb-3">*/}
                    {/*                        <img src={photoURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" onClick={() => openZoomedImageModal(photoURL)} />*/}
                    {/*                    </Col>*/}
                    {/*                ))}*/}
                    {/*                {formData.photos.length > maxImagesToShow && (*/}
                    {/*                    <Col md={3} className="mb-3">*/}
                    {/*                        <Button variant="outline-primary" onClick={openImagesModal}>*/}
                    {/*                            + Więcej zdjęć*/}
                    {/*                        </Button>*/}
                    {/*                    </Col>*/}
                    {/*                )}*/}
                    {/*            </Row>*/}
                    {/*        </Card.Body>*/}
                    {/*    </Card>*/}
                    {/*)}*/}
                </Tab>

                <Tab eventKey="advertisement" title="Ogłoszenie">
                    <Card className="mb-3">
                        <Card.Body>
                            <h5 className="card-title">Ogłoszenie</h5>
                            {/*{formData.photos && formData.photos.length > 0 && (*/}
                            {/*    <Row>*/}
                            {/*        {formData.photos.slice(0, maxImagesToShow).map((photoURL, index) => (*/}
                            {/*            <Col key={index} md={3} className="mb-3">*/}
                            {/*                <img src={photoURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" style={{ cursor: 'pointer' }} onClick={() => openZoomedImageModal(photoURL)} />*/}
                            {/*            </Col>*/}
                            {/*        ))}*/}
                            {/*        {formData.photos.length > maxImagesToShow && (*/}
                            {/*            <Col md={3} className="mb-3">*/}
                            {/*                <Button variant="outline-primary" onClick={openImagesModal}>*/}
                            {/*                    + Więcej zdjęć*/}
                            {/*                </Button>*/}
                            {/*            </Col>*/}
                            {/*        )}*/}
                            {/*    </Row>*/}
                            {/*)}*/}

                            {/*<Modal show={showImagesModal} onHide={closeImagesModal} size="lg">*/}
                            {/*    <Modal.Header closeButton>*/}
                            {/*        <Modal.Title>Wszystkie zdjęcia</Modal.Title>*/}
                            {/*    </Modal.Header>*/}
                            {/*    <Modal.Body>*/}
                            {/*        <Row>*/}
                            {/*            {formData.photos.map((photoURL, index) => (*/}
                            {/*                <Col key={index} md={4} className="mb-3">*/}
                            {/*                    <img src={photoURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" style={{ cursor: 'pointer' }} onClick={() => openZoomedImageModal(photoURL)} />*/}
                            {/*                </Col>*/}
                            {/*            ))}*/}
                            {/*        </Row>*/}
                            {/*    </Modal.Body>*/}
                            {/*</Modal>*/}

                            <p className="card-text"><strong>Tytuł:</strong> {formData.adTitle}</p>
                            <p className="card-text"><strong>Opis:</strong> {formData.adDescription}</p>
                        </Card.Body>
                    </Card>
                </Tab>

                <Tab eventKey="details" title="Szczegóły">
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Szczegóły Nieruchomości</Card.Title>
                            <Card.Text><strong>Powierzchnia:</strong> {formData.area}</Card.Text>
                            <Card.Text><strong>Ilość łazienek:</strong> {formData.bathrooms}</Card.Text>
                            <Card.Text><strong>Ilość kuchni:</strong> {formData.kitchens}</Card.Text>
                            <Card.Text><strong>Ilość pokoi:</strong> {formData.rooms}</Card.Text>
                            <Card.Text><strong>Estymowana cena wynajmu:</strong> {formData.estimatedRent}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Informacje o Właścicielu</Card.Title>
                            <Card.Text><strong>Imię i nazwisko:</strong> {formData.name}</Card.Text>
                            <Card.Text><strong>Email:</strong> {formData.email}</Card.Text>
                            <Card.Text><strong>Telefon:</strong> {formData.phone}</Card.Text>
                        </Card.Body>
                    </Card>
                </Tab>
            </Tabs>

            {/* Modal do wyświetlenia wszystkich zdjęć */}
            {/*<Modal show={showImagesModal} onHide={closeImagesModal} size="lg">*/}
            {/*    <Modal.Header closeButton>*/}
            {/*        <Modal.Title>Wszystkie zdjęcia</Modal.Title>*/}
            {/*    </Modal.Header>*/}
            {/*    <Modal.Body>*/}
            {/*        <Row>*/}
            {/*            {formData.photos.map((photoURL, index) => (*/}
            {/*                <Col key={index} md={4} className="mb-3" onClick={() => openZoomedImageModal(photoURL)}>*/}
            {/*                    <img src={photoURL} alt={`Zdjęcie ${index + 1}`} className="img-fluid" style={{ cursor: 'pointer' }} />*/}
            {/*                </Col>*/}
            {/*            ))}*/}
            {/*        </Row>*/}
            {/*    </Modal.Body>*/}
            {/*</Modal>*/}

            {/* Modal do wyświetlenia powiększonego zdjęcia */}
            {/*<Modal show={showZoomedImageModal} onHide={closeZoomedImageModal} size="lg">*/}
            {/*    <Modal.Body>*/}
            {/*        <img src={selectedImage} alt="Powiększone zdjęcie" className="img-fluid" />*/}
            {/*    </Modal.Body>*/}
            {/*</Modal>*/}

            {/* Przycisk do wyczyszczenia danych */}
            <button className="btn btn-danger" onClick={handleClearData}>Wyczyść Dane</button>
            <button className="btn" onClick={handleSaveToApartmentList}>Zapisz Dane</button>
        </Container>
    );
}

export default SummaryPage
