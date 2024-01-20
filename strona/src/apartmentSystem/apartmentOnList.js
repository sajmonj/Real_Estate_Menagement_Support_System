import React from "react";
import '../style/apartmentOnList.css';
import Button from 'react-bootstrap/Button';

export function ApartmentOnList({apartment, navigate, openPopup}) {

    return (
        <div className="apartmentOnListView closeText" onClick={() => navigate(`/apartments/${apartment.id}`)}>
            <div>
                <h3 style={{marginBottom: 10}}>{apartment.street} {apartment.streetNumber}</h3>
                <p>{apartment.street.length === 0 ? apartment.city : "ul. " + apartment.street} {apartment.streetNumber}{apartment.apartmentNumber === 0 ? "" : "/" + apartment.apartmentNumber}</p>
                <p>{apartment.zipCode} {apartment.city}</p>
            </div>
            <div>
                <p>Rooms: {apartment.rooms}</p>
                <p>Area: {apartment.area} m²</p>
                <p>Est. rent price: {apartment.estimatedRent} zł</p>
            </div>
            <div>
                <p>Property type: {apartment.propertyType[0].toUpperCase() + apartment.propertyType.slice(1)}</p> {/* residential, commercial */}
                <p>Detailed type: {apartment.detailedType}</p>
            </div>
            <div className="buttonPanel">
                <Button variant="outline-primary" style={{margin: 5}} onClick={(e) => {
                    navigate(`/edit-apartment/${apartment.id}`);
                    e.stopPropagation();
                }}>Edit</Button>
                <Button variant="outline-danger" style={{margin: 5}} onClick={(e) => {
                    openPopup(apartment.id);
                    e.stopPropagation();
                }}>Remove</Button>
            </div>
        </div>
    );
}