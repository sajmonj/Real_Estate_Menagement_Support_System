import {useState, useEffect} from 'react';

export function ApartmentManager() {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const storedApartments = localStorage.getItem('apartments');
        if (storedApartments) {
            const parsedApartments = JSON.parse(storedApartments).map(apartment => ({
                ...apartment,
                events: apartment.events || []
            }));
            setApartments(parsedApartments);
        }
    }, []);


    function getDevelopmentTypeName(type) {
        switch (type) {
            case 0: return "blok"
            case 1: return "kamienica"
            case 2: return "dom"
            case 3: return "szeregowiec"
            case 4: return "apartamentowiec"
            default: return "pozostałe"
        }
    }
    /*
                id: apartments.length === 0 ? 0 : apartments[apartments.length - 1].id + 1,
                adDescription: apartmentInfo.adDescription,
                adTitle: apartmentInfo.adTitle,
                photos: apartmentInfo.photos,
                bathrooms: apartmentInfo.bathrooms,
                city: apartmentInfo.city,
                detailedType: apartmentInfo.detailedType,
                email: apartmentInfo.email,
                estimatedRent: apartmentInfo.estimatedRent,
                kitchens: apartmentInfo.kitchens,
                name: apartmentInfo.name,
                phone: apartmentInfo.phone,
                propertyType: apartmentInfo.propertyType,
                area: apartmentInfo.area,
                apartmentNumber: apartmentInfo.apartmentNumber,
                rooms: apartmentInfo.rooms,
                street: apartmentInfo.street,
                streetNumber: apartmentInfo.streetNumber,
                zipCode: apartmentInfo.zipCode
     */

    function registerApartment(apartmentInfo) {
        console.log("tutaj",apartmentInfo);
        const newApartment = {
            ...apartmentInfo,
            id: apartments.length === 0 ? 0 : apartments[apartments.length - 1].id + 1,
            events: [],
            totalAmount: 0
        };

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
                    const newTotalAmount = (apartment.totalAmount || 0) + (event.amount || 0);
                    const updatedEvents = [...(apartment.events || []), event];
                    return { ...apartment, events: updatedEvents, totalAmount: newTotalAmount };
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


    function updateEvent(apartmentId, eventId, newEventData) {
        setApartments(prevApartments => {
            const updatedApartments = prevApartments.map(apartment => {
                if (apartment.id === apartmentId) {
                    const updatedEvents = apartment.events.map(event => {
                        if (event.id === eventId) {
                            return { ...event, ...newEventData };
                        }
                        return event;
                    });
                    return { ...apartment, events: updatedEvents };
                }
                return apartment;
            });

            // Zapisz zaktualizowane apartamenty w localStorage
            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }


    function removeEvent(apartmentId, eventId) {
        setApartments(prevApartments => {
            const updatedApartments = prevApartments.map(apartment => {
                if (apartment.id === apartmentId) {
                    const filteredEvents = apartment.events.filter(event => event.id !== eventId);
                    return { ...apartment, events: filteredEvents };
                }
                return apartment;
            });
            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }

    return {
        apartments,
        registerApartment,
        removeApartment,
        getDevelopmentTypeName,
        removeApartmentsByOwnerEmail,
        addEventToApartment,
        updateTotalAmount
    };
}

