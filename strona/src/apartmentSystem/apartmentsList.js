import {useNavigate} from "react-router-dom";
import {ApartmentManager} from "./apartmentManager";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {ApartmentOnList} from "./apartmentOnList";
import {PopupRemovingApartment as Popup} from "../components/popup";
import {CheckboxTree} from "./CheckboxTree";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ValueRange from "./RangeSlider";

import {Form, Container, Row, Col, Stack, Button} from 'react-bootstrap';

export function ApartmentsList(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {apartments, removeApartment} = ApartmentManager();

    const [showPopup, setShowPopup] = useState(false);
    const [apartmentIdToDelete, setApartmentIdToDelete] = useState(null);

    const [userApartments, setUserApartments] = useState([]);
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('street');
    const [sortedKey, setSortedKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const sortedType = useRef('numeric');

    const [selectedAreaRange, setSelectedAreaRange] = useState([]);
    const [maxArea, setMaxArea] = useState(10);
    const [selectedEstPriceRange, setSelectedEstPriceRange] = useState([]);
    const [maxEstPrice, setMaxEstPrice] = useState(10);
    const [selectedRoomCountRange, setSelectedRoomCountRange] = useState([]);
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
        setMaxValuesAndRanges(apartmentsOfUser);
    }, [navigate, loggedIn, apartments, userInfo, maxArea, maxEstPrice, maxRoomCount]);

    const openPopup = (apartmentID) => { setShowPopup(true); setApartmentIdToDelete(apartmentID); };

    const closePopup = () => { setShowPopup(false); setApartmentIdToDelete(null); };

    const confirmDelete = () => {if (apartmentIdToDelete != null) { removeApartment(apartmentIdToDelete); closePopup(); }};

    const setMaxValuesAndRanges = (apartments) => {
        const maxArea = apartments.reduce((max, apartment) => apartment.area > max ? apartment.area : max, 10);
        setMaxArea(maxArea);
        setSelectedAreaRange([0, maxArea]);

        const maxEstPrice = apartments.reduce((max, apartment) => {
            const rentValue = parseFloat(apartment.estimatedRent.split(' ')[0].replace(',','.'));
            return rentValue > max ? rentValue : max
        }, 10);
        setMaxEstPrice(maxEstPrice);
        setSelectedEstPriceRange([0, maxEstPrice]);

        const maxRoomCount = apartments.reduce((max, apartment) => apartment.rooms > max ? apartment.rooms : max, 10);
        setMaxRoomCount(maxRoomCount);
        setSelectedRoomCountRange([0, maxRoomCount]);
    }

    const handleSort = (key, type) => {
        sortedType.current = type;
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        setSortedKey(key);
    };

    const getsFiltered = (apartment) => {
        if (!isFiltered) return apartment;
        let filtered = false;
        Object.keys(categories).forEach(category => {
            Object.keys(categories[category]).forEach(type => {
                if (categories[category][type] && apartment.detailedType === type) filtered = true;
            })
        });
        if (filtered) return apartment;
        else return false;
    }

    const goThroughRanges = (apartment) => {
        return apartment.area >= selectedAreaRange[0] && apartment.area <= selectedAreaRange[1] &&
            parseFloat(apartment.estimatedRent.split(' ')[0].replace(',','.')) >= selectedEstPriceRange[0] &&
            parseFloat(apartment.estimatedRent.split(' ')[0].replace(',','.')) <= selectedEstPriceRange[1] &&
            apartment.rooms >= selectedRoomCountRange[0] && apartment.rooms <= selectedRoomCountRange[1];
    };

    const resetFilters = () => {
        setCategories({
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
        setIsFiltered(false);
        setSelectedAreaRange([0, maxArea]);
        setSelectedEstPriceRange([0, maxEstPrice]);
        setSelectedRoomCountRange([0, maxRoomCount]);
        setSearch('');
        setSearchBy('street');
    }

    const filteredApartments = useMemo(() => {
        return userApartments
            .filter(apartment => search === '' ? apartment : apartment[searchBy].toLowerCase().includes(search))
            .filter(apartment => !isFiltered ? apartment : getsFiltered(apartment))
            .filter(apartment => goThroughRanges(apartment))
    }, [userApartments, search, searchBy, isFiltered, categories, selectedAreaRange, selectedEstPriceRange, selectedRoomCountRange]);

    return (
        <>
            <h1 style={{marginTop: 20, marginBottom: 20, textAlign: 'center'}}>
                <span className="hyperlink text14" style={{float: 'left', margin: 15, userSelect: 'none'}}
                      onClick={() => navigate("/")}>&lt; Go back</span>
                Apartments List of user: {userInfo.firstname} {userInfo.lastname}
            </h1>
            <div style={{backgroundColor: '#cccccc', height: 1.5, width: '100%', marginBottom: 20}}/>
            <Container>
                <Row>
                    <Col xs={3}>
                        <Stack gap={4} className='Filters'>
                            <Button variant="outline-success" style={{width: '100%', marginBottom: -15}}
                                    onClick={() => navigate("/add-apartment")}>Add new Apartment</Button>
                            <Button variant="outline-dark" style={{width: '100%', marginBottom: 20}}
                                    onClick={resetFilters}>Reset all filters</Button>
                            <div>
                                <h5>Search</h5>
                                <input type="text" placeholder={'Search by: ' + searchBy} style={{width: '100%'}} value={search}
                                       onChange={e => setSearch(e.target.value.toLowerCase())}/>
                                <Form.Select aria-label="Select searching" value={searchBy} style={{marginTop: 5}}
                                             onChange={(e) => setSearchBy(e.target.value)}>
                                    <option value='street'>Street</option>
                                    <option value="city">City</option>
                                    <option value="adTitle">Ad title</option>
                                </Form.Select>
                            </div>
                            <div>
                                <h5>Sorting by: {sortedKey}<span style={{
                                    marginTop: 7,
                                    float: 'right',
                                    fontSize: 10
                                }}>{sortOrder === 'asc' ? 'Low to High' : 'High to Low'}</span></h5>
                                <button className="sortButton" onClick={() => handleSort('street', 'text')}>Street
                                </button>
                                <button className="sortButton" onClick={() => handleSort('area', 'numeric')}>Area
                                </button>
                                <button className="sortButton" onClick={() => handleSort('rooms', 'numeric')}>Rooms
                                </button>
                            </div>
                            {/*' maxArea: ' + maxArea + ' maxEstPrice: ' + maxEstPrice + ' maxRoomCount: ' + maxRoomCount + ' isFiltered: ' + isFiltered*/}
                            <div>
                                <h5>Apartment type</h5>
                                <CheckboxTree categories={categories} setCategories={setCategories}
                                              setIsFiltered={setIsFiltered}/>
                            </div>
                            <div>
                                <h5>Area</h5>
                                <ValueRange range={selectedAreaRange} setRange={setSelectedAreaRange}
                                            maxValue={maxArea}/>
                            </div>
                            <div>
                                <h5>Estimated rent price</h5>
                                <ValueRange range={selectedEstPriceRange} setRange={setSelectedEstPriceRange}
                                            maxValue={maxEstPrice}/>
                            </div>
                            <div>
                                <h5>Room count</h5>
                                <ValueRange range={selectedRoomCountRange} setRange={setSelectedRoomCountRange}
                                            maxValue={maxRoomCount}/>
                            </div>
                        </Stack>
                    </Col>
                    <Col>
                        {userApartments.length === 0 ? <div>You don't have any apartments yet.</div> :
                            <ul>
                                {filteredApartments.sort((a, b) => {
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
                        }
                    </Col>
                </Row>
            </Container>
            <Popup show={showPopup} onClose={closePopup} onConfirm={confirmDelete}/>
        </>
    )
}