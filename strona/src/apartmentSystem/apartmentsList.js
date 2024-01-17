import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useRef, useState} from "react";
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
    const sortOrder = useRef('asc');
    const sortedType = useRef('numeric');
    const sortedKey = useRef('');


    useEffect(() => {
        // console.log(userInfo);
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
        setSearchedApartments(userApartments.slice()
            .filter(apartment => apartment.street.toLowerCase().includes(e.target.value.toLowerCase()))
            .sort((a, b) => {
                if (sortedType.current === 'numeric') {
                    return sortOrder.current === 'asc' ? a[sortedKey.current]-b[sortedKey.current] : b[sortedKey.current]-a[sortedKey.current];
                } else if (sortedType.current === 'string') {
                    return sortOrder.current === 'asc' ? a[sortedKey.current].localeCompare(b[sortedKey.current]) : b[sortedKey.current].localeCompare(a[sortedKey.current]);
                } else return 1;
        }));
    };

    const handleNumericSort = (key) => {
        sortOrder.current = sortOrder.current === 'asc' ? 'desc' : 'asc';
        setSearchedApartments(userApartments.slice().sort((a, b) =>
            sortOrder.current === 'asc' ? a[key]-b[key] : b[key]-a[key]));
        sortedType.current = 'numeric';
        sortedKey.current = key;
    };

    const handleStringSort = (key) => {
        sortOrder.current = sortOrder.current === 'asc' ? 'desc' : 'asc';
        const sortedApartments = userApartments.slice().sort((a, b) =>
            sortOrder.current === 'asc' ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]));
        setSearchedApartments(sortedApartments);
        sortedType.current = 'string';
        sortedKey.current = key;
    };

    return (
        <>
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back</span>
            <h1>Apartments List of user: {userInfo.firstname} {userInfo.lastname}</h1>
            <input type="text" placeholder="Search by name" onChange={handleSearchChange}/>
            <button className="whiteButton" onClick={() => handleStringSort('street')}>Sort by street</button>
            <button className="whiteButton" onClick={() => handleNumericSort('area')}>Sort by area</button>
            {sortOrder.current + 'ending'}
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
            <button className="greenButton longerButton" onClick={() => navigate("/add-apartment")}>Add New Apartment
            </button>
        </>
    )
}