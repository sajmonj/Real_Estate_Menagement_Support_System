import {ApartmentManager} from "./apartmentManager";
import React from "react";
import './apartmentOnList.css';

export function ApartmentOnList({apartment, navigate, openPopup}) {
    const {getDevelopmentTypeName} = ApartmentManager();

    function edit() {
        console.log("edit");
        console.log(apartment);
    }

    return (
        <div className="apartmentOnListView">
            {/*<img className="apartmentSmallPicture" src={apartment.pictures[0]} alt={apartment.title} />*/}
            <div>
                <h3>{apartment.street} {apartment.streetNumber}</h3>
                {/*<p className="closeText">{apartment.description}</p><br/>*/}
                <div className="infoGrid">
                    <div className="closeText">
                        <p>{apartment.street.length === 0 ? apartment.city : "ul. " + apartment.street} {apartment.streetNumber}{apartment.apartmentNumber === 0 ? "" : "/" + apartment.apartmentNumber}</p>
                        <p>{apartment.zipCode} {apartment.city}</p>
                        {/*<p>{apartment.country}</p>*/}
                    </div>
                    {/*<div className='closeText'>*/}
                    {/*    <p>Typ: {getDevelopmentTypeName(apartment.developmentType)}</p>*/}
                    {/*    <p>Stan: {apartment.furnished ? "Umeblowany" : "Nie umeblowany"}</p>*/}
                    {/*    <p>Piętro: {apartment.floor}</p>*/}
                    {/*</div>*/}
                    <div className='closeText'>
                        <p>Rooms: {apartment.rooms}</p>
                        <p>Kitchens: {apartment.kitchens}</p>
                        <p>Bathrooms: {apartment.bathrooms}</p>
                        <p>Area: {apartment.area} m²</p>
                        <p>Est. rent price: {apartment.estimatedRent} PLN</p>
                    </div>
                    <div className='closeText'>
                        <p>Property type: {apartment.propertyType}</p>
                        <p>DetailedType: {apartment.detailedType}</p>
                    </div>
                </div>
            </div>
            <div className="buttonPanel">
                <button className="greenButton" onClick={edit}>Edit</button>
                <button className="whiteButton" onClick={() => navigate(`/apartments/${apartment.id}`)}>View</button>
                <button className="redButton" onClick={() => openPopup(apartment.id)}>Remove</button>
            </div>
        </div>
    );
}