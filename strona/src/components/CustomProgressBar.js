import React from 'react';
// import { ProgressBar } from 'react-bootstrap';
import '../style/ProgressBar.css';

const stepsLabels = [
    "Property type",
    "Application",
    "Address",
    "Property details",
    "Owner details",
    "Property photos",
    "Text for the ad"
];

function CustomProgressBar({ currentStep }) {
    return (
        <div className="d-flex justify-content-center my-4">
            {stepsLabels.map((label, index) => {
                const isActive = index + 1 === currentStep;
                const isComplete = index + 1 < currentStep;

                return (
                    <div key={label} className={`step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
                        <span className="step-number">{index + 1}</span>
                        <span className="step-label">{label}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default CustomProgressBar;
