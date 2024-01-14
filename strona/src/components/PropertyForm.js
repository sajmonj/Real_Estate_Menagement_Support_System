import React, { useState } from 'react';
import SelectType from './SelectType';
import PropertyTypeForm from './PropertyTypeForm';
import AddressForm from './AddressForm';
import DetailsForm from "./DetailsForm";
import OwnerForm from "./OwnerForm";
import UploadPhotosForm from "./UploadPhotosForm";
import AdvertisementForm from "./AdvertisementForm";
import SummaryPage from "../pages/SummaryPage";
import {useNavigate} from "react-router-dom";

function PropertyForm(props) {
    const navigate = useNavigate();
    const {loggedIn, userInfo} = props
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem('formData');
        return savedFormData ? JSON.parse(savedFormData) : {};
    });

    // const [formData, setFormData] = useState({});

    const nextStep = () => {
        if(step === 5){
            setStep(step + 2);
        }
        else{
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    // Aby było zapisane po odświeżeniu
    const updateFormData = (newData) => {
        const updatedFormData = { ...formData, ...newData };
        console.log("NEWDATE",newData);
        setFormData(updatedFormData);
        localStorage.setItem('formData', JSON.stringify(updatedFormData));
    };

    // const updateFormData = (newData) => {
    //     setFormData({ ...formData, ...newData });
    // };

    const clearFormData = () => {
        localStorage.removeItem('formData');
        setFormData({});
        // console.log("USER",userInfo.name);
        navigate("/");
        // Resetuj stan do stanu początkowego
    };

    switch (step) {
        case 1:
            return <SelectType updateFormData={updateFormData} nextStep={nextStep} />;
        case 2:
            return <PropertyTypeForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
        case 3:
            return <AddressForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <DetailsForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 5:
            return <OwnerForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} userInfo={userInfo} />;
        case 6:
            return <UploadPhotosForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 7:
            return <AdvertisementForm formData={formData} updateFormData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 8:
            return <SummaryPage formData={formData} clearFormData={clearFormData} />;
        default:
            return <div>Błąd: Nieznany krok</div>;
    }
}

export default PropertyForm;