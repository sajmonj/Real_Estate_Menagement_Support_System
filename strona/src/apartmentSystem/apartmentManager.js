import {useState, useEffect} from 'react';

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
        console.log("asd",apartmentInfo);
        setApartments(prevApartments => {
            const newApartment = {
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
            };
            console.log(newApartment);
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

