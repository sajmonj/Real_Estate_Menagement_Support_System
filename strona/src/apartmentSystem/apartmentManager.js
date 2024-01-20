import {useState, useEffect} from 'react';

export function ApartmentManager() {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const storedApartments = localStorage.getItem('apartments');
        if (storedApartments) {
            const parsedApartments = JSON.parse(storedApartments).map(apartment => ({
                ...apartment,
                events: apartment.events || [],
                landlords: apartment.landlords || []
            }));
            setApartments(parsedApartments);
        }
    }, []);

    function registerApartment(apartmentInfo) {
        console.log("tutaj",apartmentInfo);
        const newApartment = {
            ...apartmentInfo,
            id: apartments.length === 0 ? 0 : apartments[apartments.length - 1].id + 1,
            events: [],
            landlords: [],
            totalAmount: 0
        };

        console.log(newApartment);

        setApartments((prevApartments) => [...prevApartments, newApartment]);
        localStorage.setItem('apartments', JSON.stringify([...apartments, newApartment]));
        console.log("Po zapisaniu:", newApartment);
        return newApartment;
    }

    function removeApartment(id) {
        setApartments(prevApartments => {
            const newApartments = prevApartments.filter(apartment => apartment.id !== id);
            localStorage.setItem('apartments', JSON.stringify(newApartments));
            return newApartments;
        });
    }

    function updateApartment(apartmentId, updatedData) {
        const updatedApartments = apartments.filter(apartment => apartment.id !== parseInt(apartmentId));
        updatedApartments.push(updatedData);
        setApartments(updatedApartments);
        localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    }


    function removeApartmentsByOwnerEmail(ownerEmail) {
        setApartments(prevApartments => {
            const newApartments = prevApartments.filter(apartment => apartment.email !== ownerEmail);
            localStorage.setItem('apartments', JSON.stringify(newApartments));
            return newApartments;
        });
    }

    function addEventToApartment(apartmentId, event) {
        setApartments(prevApartments => {
            const updatedApartments = prevApartments.map(apartment => {
                if (apartment.id === apartmentId) {
                    const updatedEvents = [...apartment.events, event];
                    const newTotalAmount = (apartment.totalAmount || 0) + parseFloat(event.amount || 0);
                    return { ...apartment, events: updatedEvents, totalAmount: newTotalAmount };
                }
                return apartment;
            });
            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }

    function addLandlordToApartment (apartmentID, event) {
        setApartments(prevApartments => {
            const updatedApartments = prevApartments.map(apartment => {
                if (apartment.id === apartmentID) {
                    const updatedLandlords = [...apartment.landlords, event];
                    return { ...apartment, landlords: updatedLandlords};
                }
                return apartment;
            });
            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }


    function updateTotalAmount(apartmentId, newAmount) {
        setApartments(prevApartments => {
            const updatedApartments = prevApartments.map(apartment => {
                if (apartment.id === apartmentId) {
                    const updatedTotalAmount = (apartment.totalAmount || 0) + newAmount;
                    return { ...apartment, totalAmount: updatedTotalAmount };
                }
                return apartment;
            });

            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }
    function registerApartment(apartmentInfo, ownerInfo) {
        const newApartment = {
            ...apartmentInfo,
            id: apartments.length === 0 ? 0 : apartments[apartments.length - 1].id + 1,
            owner: ownerInfo,
            events: [],
            totalAmount: 0
        };

        setApartments((prevApartments) => [...prevApartments, newApartment]);
        localStorage.setItem('apartments', JSON.stringify([...apartments, newApartment]));
        return newApartment;
    }


    // function updateEvent(apartmentId, eventId, newEventData) {
    //     setApartments(prevApartments => {
    //         const updatedApartments = prevApartments.map(apartment => {
    //             if (apartment.id === apartmentId) {
    //                 const updatedEvents = apartment.events.map(event => {
    //                     if (event.id === eventId) {
    //                         return { ...event, ...newEventData };
    //                     }
    //                     return event;
    //                 });
    //                 return { ...apartment, events: updatedEvents };
    //             }
    //             return apartment;
    //         });
    //
    //
    //         localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    //         return updatedApartments;
    //     });
    // }
    //
    //
    // function removeEvent(apartmentId, eventId) {
    //     setApartments(prevApartments => {
    //         const updatedApartments = prevApartments.map(apartment => {
    //             if (apartment.id === apartmentId) {
    //                 const filteredEvents = apartment.events.filter(event => event.id !== eventId);
    //                 return { ...apartment, events: filteredEvents };
    //             }
    //             return apartment;
    //         });
    //         localStorage.setItem('apartments', JSON.stringify(updatedApartments));
    //         return updatedApartments;
    //     });
    // }

    return {
        apartments,
        registerApartment,
        removeApartment,
        removeApartmentsByOwnerEmail,
        addEventToApartment,
        addLandlordToApartment,
        updateTotalAmount,
        updateApartment
    };
}

