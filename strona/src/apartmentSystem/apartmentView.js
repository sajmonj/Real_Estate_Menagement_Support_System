import {useNavigate, useParams} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import {useEffect} from "react";
import './apartmentOnList.css';

export function ApartmentView(props) {
    const {id} = useParams();
    const {loggedIn, userInfo} = props;
    const navigate = useNavigate();
    const {apartments, getDevelopmentTypeName} = ApartmentManager();

    const apartment = apartments.find(apartment => apartment.id === parseInt(id));

    useEffect(() => {
        if (!loggedIn) navigate('/');
    }, [loggedIn, navigate]);

    return (
        <>
            {apartment ?
                <>
                    <span className="hyperlink text12" onClick={() => navigate("/apartments")}>&lt; Go back to the apartments list</span>
                    <h1>Apartment view:</h1>
                    <div>Address: {apartment.street} {apartment.streetNumber}/{apartment.apartmentNumber} {apartment.city} {apartment.postalCode}</div>
                    <div>Property type: {apartment.propertyType} / {apartment.detailedType}</div>
                    <div>Area: {apartment.area} m2</div>
                    <div>Estimated rent price: {apartment.estimatedRent} PLN</div>
                    <div>Rooms: {apartment.rooms}</div>
                    <div>Kitchens: {apartment.kitchens}</div>
                    <div>Bathrooms: {apartment.bathrooms}</div>
                    <br></br>
                    <h3>Advertisement: </h3>
                    <h5>{apartment.adTitle}</h5>
                    <div>Description: {apartment.adDescription}</div>
                    {   apartment.photos ?
                        <div>
                            Photos:
                            {apartment.photos.map(photo => (
                                <img className="photo" src={photo} alt='apartment photo'/>
                            ))}
                        </div>
                        : <div>No photos available</div>
                    }
                    {/*<img src={apartment.pictures[0]} alt="Apartment picture"/>*/}
                </>
                : <div>Apartment not found</div>
            }
        </>
    )
}