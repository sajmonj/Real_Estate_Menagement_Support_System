import React from "react";
import '../style/apartmentOnList.css';
import Button from 'react-bootstrap/Button';

export function ApartmentOnList({apartment, navigate, openPopup}) {

    return (
        <div className="apartmentOnListView" onClick={() => navigate(`/apartments/${apartment.id}`)}>
            <div>
                <h3>{apartment.street} {apartment.streetNumber}</h3>
                <div className="infoGrid">
                    <div className="closeText">
                        <p>{apartment.street.length === 0 ? apartment.city : "ul. " + apartment.street} {apartment.streetNumber}{apartment.apartmentNumber === 0 ? "" : "/" + apartment.apartmentNumber}</p>
                        <p>{apartment.zipCode} {apartment.city}</p>
                    </div>
                    <div className='closeText'>
                        <p>Rooms: {apartment.rooms}</p>
                        <p>Kitchens: {apartment.kitchens}</p>
                        <p>Bathrooms: {apartment.bathrooms}</p>
                        <p>Area: {apartment.area} m²</p>
                        <p>Est. rent price: {apartment.estimatedRent} PLN</p>
                    </div>
                    <div className='closeText'>
                        <p>Property type: {apartment.propertyType}</p> {/* residential, commercial */}
                        <p>Detailed type: {apartment.detailedType}</p>
                    </div>
                </div>
            </div>
            <div className="buttonPanel">
                <Button variant="outline-primary" style={{margin: 5}} onClick={(e) => {
                    navigate(`/edit-apartment/${apartment.id}`);
                    e.stopPropagation();}}>Edit</Button>
                <Button variant="outline-danger" style={{margin: 5}} onClick={(e) => {
                    openPopup(apartment.id); e.stopPropagation(); }}>Remove</Button>
            </div>
        </div>
    );
}
