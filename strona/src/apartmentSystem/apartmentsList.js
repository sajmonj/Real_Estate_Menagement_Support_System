import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useRef, useState} from "react";
import {ApartmentOnList} from "./apartmentOnList";
import {PopupRemovingApartment as Popup} from "../components/popup";
import {CheckboxTree} from "./CheckboxTree";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function ApartmentsList(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {apartments, removeApartment} = ApartmentManager();

    const [showPopup, setShowPopup] = useState(false);
    const [apartmentIdToDelete, setApartmentIdToDelete] = useState(null);

    const [userApartments, setUserApartments] = useState([]);
    const [search, setSearch] = useState('');
    const [sortedKey, setSortedKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const sortedType = useRef('numeric');

    //const [selectedAreaInterval, setSelectedAreaInterval] = useState([]);
    const [maxArea, setMaxArea] = useState(10);
    //const [selectedEstPriceInterval, setSelectedEstPriceInterval] = useState([]);
    const [maxEstPrice, setMaxEstPrice] = useState(10);
    //const [selectedRoomCountInterval, setSelectedRoomCountInterval] = useState([]);
    const [maxRoomCount, setMaxRoomCount] = useState(10);

    const [isFiltered, setIsFiltered] = useState(false);
    const [categories, setCategories] = useState({
        Residential: {
            House: false,
            Apartment: false,
            Condominium: false,
            Townhouse: false,
            Room: false,
            Other: false,
        },
        Commercial: {
            Industrial: false,
            Retail: false,
            'Shopping Mall': false,
            Warehouse: false,
            Parking: false,
            Land: false,
            Other: false,
        },
    });


    useEffect(() => {
        if (!loggedIn) navigate('/');
        const apartmentsOfUser = apartments.filter(apartment => apartment.email === userInfo.email);
        setUserApartments(apartmentsOfUser);
        setMaxValues(apartmentsOfUser);
    }, [navigate, loggedIn, apartments, userInfo, maxArea, maxEstPrice, maxRoomCount]);

    const openPopup = (apartmentID) => { setShowPopup(true); setApartmentIdToDelete(apartmentID); };

    const closePopup = () => { setShowPopup(false); setApartmentIdToDelete(null); };

    const confirmDelete = () => {if (apartmentIdToDelete != null) { removeApartment(apartmentIdToDelete); closePopup(); }};

    const setMaxValues = (apartments) => {
        setMaxArea(apartments.reduce((max, apartment) => apartment.area > max ? apartment.area : max, 10));
        setMaxEstPrice(apartments.reduce((max, apartment) => {
            const rentValue = parseFloat(apartment.estimatedRent.split(' ')[0].replace(',','.'));
            return rentValue > max ? rentValue : max
        }, 10));
        setMaxRoomCount(apartments.reduce((max, apartment) => apartment.rooms > max ? apartment.rooms : max, 10));
    }

    const handleNumericSort = (key) => {
        sortedType.current = 'numeric';
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        setSortedKey(key);
    };

    const handleStringSort = (key) => {
        sortedType.current = 'text';
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        setSortedKey(key);
    };

    const getsFiltered = (apartment) => {
        if (!isFiltered) return apartment;
        let nonFiltered = true;
        Object.keys(categories).forEach(category => {
            Object.keys(categories[category]).forEach(type => {
                if (categories[category][type] && apartment.detailedType === type) nonFiltered = false;
            })
        });
        if (!nonFiltered) return apartment;
        else return false;
    }

    return (
        <>
            <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back</span>
            <h1>Apartments List of user: {userInfo.firstname} {userInfo.lastname}</h1>
            <input type="text" placeholder="Search by name" onChange={e => setSearch(e.target.value.toLowerCase())}/>
            <button className="whiteButton" onClick={() => handleStringSort('street')}>Sort by street</button>
            <button className="whiteButton" onClick={() => handleNumericSort('area')}>Sort by area</button>
            {sortOrder === 'asc' ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown} />}
            {' maxArea: ' + maxArea + ' maxEstPrice: ' + maxEstPrice + ' maxRoomCount: ' + maxRoomCount + ' isFiltered: ' + isFiltered}
            <CheckboxTree categories={categories} setCategories={setCategories} setIsFiltered={setIsFiltered} />
            {userApartments.length === 0 ? <div>You don't have any apartments yet.</div> :
                <>
                    <ul>
                        {userApartments
                            .filter(apartment => search === '' ? apartment : apartment.street.toLowerCase().includes(search))
                            .filter(apartment => getsFiltered(apartment))
                            .sort((a, b) => {
                                if (sortedType.current === 'numeric') {
                                    return sortOrder === 'asc' ? a[sortedKey] - b[sortedKey] : b[sortedKey] - a[sortedKey];
                                } else if (sortedType.current === 'text') {
                                    return sortOrder === 'asc' ? a[sortedKey].localeCompare(b[sortedKey]) : b[sortedKey].localeCompare(a[sortedKey]);
                                } else return 1;
                            }).map(apartment => (
                                <li key={apartment.id}>
                                    <ApartmentOnList apartment={apartment} navigate={navigate} openPopup={openPopup}/>
                                </li>
                            ))}
                    </ul>
                </>
            }
            <Popup show={showPopup} onClose={closePopup} onConfirm={confirmDelete}/>
            <button className="greenButton longerButton" onClick={() => navigate("/add-apartment")}>Add New Apartment
            </button>
        </>
    )
}