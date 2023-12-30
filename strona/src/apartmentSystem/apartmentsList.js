import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useState} from "react";
import {UserManager} from "../LoginSystem/userManager";

export function ApartmentsList(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {apartments, registerApartment, removeApartment} = ApartmentManager();
    const {users} = UserManager();

    const [userApartments, setUserApartments] = useState([]);

    useEffect(() => {
        if (!loggedIn) navigate('/');
        const filteredApartments = apartments.filter(apartment => apartment.ownerID === userInfo.id);
        setUserApartments(filteredApartments);
    }, [navigate, loggedIn, users, apartments, userInfo.id]);


    function createNewApartment() {
        let newApartment = {
            ownerID:  userInfo.id,
            country: "Poland",
            city: "Kraków",
            postalCode: "30-000",
            street: "Długa",
            developmentType: 0,
            buildingNumber: 12,
            apartmentNumber: 8,
            area: 54,
            furnished: true,
            floor: 1,
            price: 250_000,
            rooms: 4,
            description: "Fajne mieszkanie",
            pictures: ["https://cdn.galleries.smcloud.net/t/galleries/gf-7VEN-X6uc-bYsP_kobiece-wnetrze-z-elementami-art-deco-salon-664x442.jpg"]
        }
        registerApartment(newApartment);
    }
    return (
        <>
            <span className="hyperlink smallerText" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
            <h1>Apartments List of user: {userInfo.firstname} {userInfo.lastname}</h1>
            {userApartments.length === 0 ? <div>You don't have any apartments yet.</div> :
                <>
                    <ul>
                        {userApartments.map(apartment => (
                            <li key={apartment.id}>
                                {apartment.id} {apartment.ownerID} {apartment.city} {apartment.street} {apartment.buildingNumber}/{apartment.apartmentNumber}
                                <button onClick={() => navigate(`/apartments/${apartment.id}`)}>View</button>
                                <button onClick={() => removeApartment(apartment.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </>
            }
            <button onClick={createNewApartment}>Add new apartment</button>
        </>
    )
}