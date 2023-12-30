import {useState, useEffect, useRef} from 'react';

export function ApartmentManager() {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const storedApartments = localStorage.getItem('apartments');
        if (storedApartments) {
            const parsedApartments = JSON.parse(storedApartments);
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

    function registerApartment(apartmentInfo) {
        setApartments(prevApartments => {
            const newApartment = {
                id: apartments.length === 0 ? 0 : apartments[apartments.length - 1].id + 1,
                ownerID: apartmentInfo.ownerID,
                country: apartmentInfo.country,
                city: apartmentInfo.city,
                postalCode: apartmentInfo.postalCode,
                street: apartmentInfo.street,
                developmentType: apartmentInfo.developmentType,
                // developmentType: 0 - blok, 1 - kamienica, 2 - dom, 3 - szeregowiec, 4 - apartamentowiec
                buildingNumber: apartmentInfo.buildingNumber,
                apartmentNumber: apartmentInfo.apartmentNumber,
                area: apartmentInfo.area,
                furnished: apartmentInfo.furnished,
                floor: apartmentInfo.floor,
                price: apartmentInfo.price,
                rooms: apartmentInfo.rooms,
                description: apartmentInfo.description,
                pictures: apartmentInfo.pictures,
            };
            const updatedApartments = [...prevApartments, newApartment];
            localStorage.setItem('apartments', JSON.stringify(updatedApartments));
            return updatedApartments;
        });
    }

    function removeApartment(id) {
        setApartments(prevApartments => {
            const newApartments = prevApartments.filter(apartment => apartment.id !== id);
            localStorage.setItem('apartments', JSON.stringify(newApartments));
            return newApartments;
        });
    }

    function removeApartmentsByOwnerID(ownerID) {
        setApartments(prevApartments => {
            const newApartments = prevApartments.filter(apartment => apartment.ownerID !== ownerID);
            localStorage.setItem('apartments', JSON.stringify(newApartments));
            return newApartments;
        });
    }

    return { apartments, registerApartment, removeApartment, getDevelopmentTypeName, removeApartmentsByOwnerID};
}

