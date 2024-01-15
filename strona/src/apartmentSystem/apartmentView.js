import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ApartmentManager } from './apartmentManager';
import './apartmentOnList.css';

export function ApartmentView(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments } = ApartmentManager();

    const apartment = apartments.find(apartment => apartment.id === parseInt(id));

    useEffect(() => {
        if (!props.loggedIn) navigate('/');
    }, [props.loggedIn, navigate]);

    if (!apartment) {
        return <div>Apartment not found</div>;
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <span className="hyperlink text12" onClick={() => navigate("/apartments")}>&lt; Go back to the apartments list</span>
                    <h1>Apartment View</h1>

                    {/* Address */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Address</Card.Title>
                            <Card.Text>{apartment.street} {apartment.streetNumber}/{apartment.apartmentNumber}, {apartment.city}, {apartment.postalCode}</
                                Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Property Details */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Property Details</Card.Title>
                            <Card.Text>Type: {apartment.propertyType} / {apartment.detailedType}</Card.Text>
                            <Card.Text>Area: {apartment.area} m2</Card.Text>
                            <Card.Text>Estimated Rent: {apartment.estimatedRent} PLN</Card.Text>
                            <Card.Text>Rooms: {apartment.rooms}</Card.Text>
                            <Card.Text>Kitchens: {apartment.kitchens}</Card.Text>
                            <Card.Text>Bathrooms: {apartment.bathrooms}</Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Owner Details */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Owner Details</Card.Title>
                            {/* Placeholder for Owner Details */}
                            <Card.Text>Name: [Owner Name]</Card.Text>
                            <Card.Text>Contact: [Owner Contact]</Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Advertisement */}
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Advertisement</Card.Title>
                            <h5>{apartment.adTitle}</h5>
                            <Card.Text>{apartment.adDescription}</Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Photos */}
                    {apartment.photos && (
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Photos</Card.Title>
                                <Row>
                                    {apartment.photos.map((photo, index) => (
                                        <Col key={index} md={4} className="mb-3">
                                            <img src={photo} alt={`Apartment photo ${index}`} className="img-fluid" />
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default ApartmentView;