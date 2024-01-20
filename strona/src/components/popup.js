import React from 'react';
import '../style/popup.css';

export function PopupRemovingApartment({ show, onClose, onConfirm }) {
    return (
        show && (
            <div className="popup">
                <p>Czy na pewno chcesz usunąć ten apartament?</p>
                <button className="redButton longerButton" onClick={onConfirm}>Tak, usuń</button>
                <button className="whiteButton longerButton" onClick={onClose}>Anuluj</button>
            </div>
        )
    );
}

export function PopupRemovingAccount({ show, onClose, onConfirm }) {
    return (
        show && (
            <div className="popup">
                <p>Czy na pewno chcesz usunąć swoje konto?</p>
                <button className="redButton longerButton" onClick={onConfirm}>Tak, usuń</button>
                <button className="whiteButton longerButton" onClick={onClose}>Anuluj</button>
            </div>
        )
    );
}
