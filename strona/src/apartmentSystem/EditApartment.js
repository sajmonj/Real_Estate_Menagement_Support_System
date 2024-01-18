import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndustry, faBuilding, faStore, faShoppingCart, faWarehouse, faParking, faTree, faEllipsisH, faHome, faCity, faHouseDamage, faDoorClosed } from '@fortawesome/free-solid-svg-icons';
import { ApartmentManager } from './apartmentManager';

export function EditApartment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apartments, updateApartment } = ApartmentManager();
    const [apartmentData, setApartmentData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [detailedTypeOptions, setDetailedTypeOptions] = useState([]);

    useEffect(() => {
        const apartment = apartments.find(ap => ap.id === parseInt(id));
        if (apartment) {
            const fullAddress = `${apartment.street} ${apartment.streetNumber}/${apartment.apartmentNumber}, ${apartment.city}, ${apartment.zipCode}`;
            setApartmentData({ ...apartment, apartmentAddress: fullAddress });
            updateDetailedTypeOptions(apartment.propertyType);
            setIsLoading(false);
        } else if (!isLoading) {
            navigate('/apartments');
        }
    }, [id, apartments, navigate, isLoading]);

    const handleChange = (e) => {
        setApartmentData({ ...apartmentData, [e.target.name]: e.target.value });
        if (e.target.name === 'propertyType') {
            updateDetailedTypeOptions(e.target.value);
        }
    };

    const updateDetailedTypeOptions = (propertyType) => {
        const options = propertyType === 'commercial'
            ? [
                { type: 'Industrial', icon: faIndustry, label: 'Industrial' },
                { type: 'Office', icon: faBuilding, label: 'Office' },
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
        setDetailedTypeOptions(options);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { street, streetNumber, apartmentNumber, city, zipCode, ...rest } = apartmentData;
        const addressParts = apartmentData.apartmentAddress.split(',');
        const [streetWithNumber, cityPart, zipCodePart] = addressParts.map(part => part.trim());
        const [streetName, number] = streetWithNumber.split(' ').map(part => part.trim());
        const updatedApartment = {
            ...rest,
            street: streetName,
            streetNumber: number.split('/')[0],
            apartmentNumber: number.split('/')[1],
            city: cityPart,
            zipCode: zipCodePart
        };
        updateApartment(id, updatedApartment);
        navigate(`/apartment/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h1>Edit Apartment</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={2}>
                        <Form.Group controlId="propertyType">
                            <Form.Label>Property Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="propertyType"
                                value={apartmentData.propertyType}
                                onChange={handleChange}
                            >
                                <option value="residential">Residential</option>
                                <option value="commercial">Commercial</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="detailedType">
                            <Form.Label>Detailed Type</Form.Label>
                            <Form.Control
                                as="select"
                                name="detailedType"
                                value={apartmentData.detailedType}
                                onChange={handleChange}
                            >
                                {detailedTypeOptions.map((option, index) => (
                                    <option key={index} value={option.type}>{option.label}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={8}>
                        <Form.Group controlId="apartmentAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="apartmentAddress"
                                value={apartmentData.apartmentAddress || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="adTitle">
                    <Form.Label>Advertisement Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="adTitle"
                        value={apartmentData.adTitle || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="adDescription">
                    <Form.Label>Advertisement Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="Advertisement description"
                        value={apartmentData.adDescription || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="area">
                            <Form.Label>Area</Form.Label>
                            <Form.Control
                                type="number"
                                name="area"
                                value={apartmentData.area || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="estimatedRent">
                            <Form.Label>Estimated Rent</Form.Label>
                            <Form.Control
                                type="number"
                                name="estimatedRent"
                                value={apartmentData.estimatedRent || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="rooms">
                            <Form.Label>Rooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="rooms"
                                value={apartmentData.rooms || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="kitchens">
                            <Form.Label>Kitchens</Form.Label>
                            <Form.Control
                                type="number"
                                name="kitchens"
                                value={apartmentData.kitchens || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="bathrooms">
                            <Form.Label>Bathrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bathrooms"
                                value={apartmentData.bathrooms || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId="ownerName">
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="ownerName"
                                value={apartmentData.ownerName || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="ownerPhone">
                            <Form.Label>Owner Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="ownerPhone"
                                value={apartmentData.ownerPhone || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="ownerEmail">
                            <Form.Label>Owner Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="ownerEmail"
                                value={apartmentData.ownerEmail || ''}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit">Save Changes</Button>
            </Form>

        </Container>
    );
}

export default EditApartment;
