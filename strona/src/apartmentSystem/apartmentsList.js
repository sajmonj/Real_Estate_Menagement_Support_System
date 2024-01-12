import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useState} from "react";
import {UserManager} from "../LoginSystem/userManager";
import {ApartmentOnList} from "./apartmentOnList";
import {PopupRemovingApartment as Popup} from "../components/popup";

export function ApartmentsList(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {apartments, registerApartment, removeApartment} = ApartmentManager();
    const {users} = UserManager();

    const [userApartments, setUserApartments] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [apartmentIdToDelete, setApartmentIdToDelete] = useState(null);

    useEffect(() => {
        if (!loggedIn) navigate('/');
        const filteredApartments = apartments.filter(apartment => apartment.ownerID === userInfo.id);
        setUserApartments(filteredApartments);
    }, [navigate, loggedIn, users, apartments, userInfo.id]);

    const openPopup = (apartmentID) => {
        setShowPopup(true);
        setApartmentIdToDelete(apartmentID);
    };

    const closePopup = () => {
        setShowPopup(false);
        setApartmentIdToDelete(null);
    };

    const confirmDelete = () => {
        if (apartmentIdToDelete) {
            removeApartment(apartmentIdToDelete);
            closePopup();
        }
    };

    const navigateToAddApartment = () => {
        navigate("/add-apartment"); // Załóżmy, że ścieżka do formularza dodawania mieszkania to "/add-apartment"
    };

    function createNewApartment() {
        let newApartment = {
            ownerID: userInfo.id,
            title: "Mieszkanie w centrum miasta",
            description: "Fajne mieszkanie",
            country: "Poland",
            city: "Wrocław",
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
            pictures: ["https://cdn.galleries.smcloud.net/t/galleries/gf-7VEN-X6uc-bYsP_kobiece-wnetrze-z-elementami-art-deco-salon-664x442.jpg"]
        }
        registerApartment(newApartment);
    }

    return (
        <>
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
            <h1>Apartments List of user: {userInfo.firstname} {userInfo.lastname}</h1>
            {userApartments.length === 0 ? <div>You don't have any apartments yet.</div> :
                <div>
                    <ul>
                        {userApartments.map(apartment => (
                            <li key={apartment.id}>
                                <ApartmentOnList apartment={apartment} navigate={navigate}
                                                 openPopup={openPopup}/>
                            </li>
                        ))}
                    </ul>
                </div>
            }
            <Popup show={showPopup} onClose={closePopup} onConfirm={confirmDelete}/>
            <button className="greenButton longerButton" onClick={navigateToAddApartment}>Add New Apartment</button>
        </>
    )
}