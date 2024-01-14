import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useState} from "react";
import {ApartmentOnList} from "./apartmentOnList";
import {PopupRemovingApartment as Popup} from "../components/popup";

export function ApartmentsList(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {apartments, removeApartment} = ApartmentManager();

    const [showPopup, setShowPopup] = useState(false);
    const [apartmentIdToDelete, setApartmentIdToDelete] = useState(null);

    const [userApartments, setUserApartments] = useState([]);
    const [searchedApartments, setSearchedApartments] = useState([]);


    useEffect(() => {
        if (!loggedIn) navigate('/');
        const apartmentsOfUser = apartments.filter(apartment => apartment.email === userInfo.email);
        setUserApartments(apartmentsOfUser);
        setSearchedApartments(apartmentsOfUser);
        //console.log(apartmentsOfUser);
    }, [navigate, loggedIn, apartments, userInfo.email]);

    const openPopup = (apartmentID) => { setShowPopup(true); setApartmentIdToDelete(apartmentID); };

    const closePopup = () => { setShowPopup(false); setApartmentIdToDelete(null); };

    const confirmDelete = () => {if (apartmentIdToDelete) { removeApartment(apartmentIdToDelete); closePopup(); }};

    const handleSearchChange = (e) => {
        setSearchedApartments(userApartments.filter(apartment => apartment.street.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    const navigateToAddApartment = () => {
        navigate("/add-apartment");
    };

    return (
        <>
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
            <h1>Apartments List of user: {userInfo.firstname} {userInfo.lastname}</h1>
            <input type="text" placeholder="Search by name" onChange={handleSearchChange}/>
            {userApartments.length === 0 ? <div>You don't have any apartments yet.</div> :
                <div>
                    <ul>
                        {searchedApartments.map(apartment => (
                            <li key={apartment.id}>
                                <ApartmentOnList apartment={apartment}
                                                 navigate={navigate}
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