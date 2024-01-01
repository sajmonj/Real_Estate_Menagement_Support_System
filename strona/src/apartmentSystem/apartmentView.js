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
                    <h1>Apartment view: {id}</h1>
                    <div>Adres: {apartment.city} {apartment.street} {apartment.buildingNumber}/{apartment.apartmentNumber}</div>
                    <div>Adres: {apartment.country} {apartment.postalCode}</div>
                    <div>Typ zabudowy: {getDevelopmentTypeName(apartment.developmentType)}</div>
                    <div>Powierzchnia: {apartment.area} m2</div>
                    <div>Stan: {apartment.furnished ? "Umeblowany" : "Nie umeblowany"}</div>
                    <div>Piętro: {apartment.floor}</div>
                    <div>Cena: {apartment.price} PLN</div>
                    <div>Liczba pokoi: {apartment.rooms}</div>
                    <div>Opis: {apartment.description}</div>
                    <img src={apartment.pictures[0]} alt="Apartment picture"/>
                </>
                : <div>Apartment not found</div>
            }
        </>
    )
}