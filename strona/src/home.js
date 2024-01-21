import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import {UserManager} from "./LoginSystem/userManager";
import {ApartmentManager} from "./apartmentSystem/apartmentManager";
import {PopupRemovingAccount as Popup} from "./components/popup";
import {Button, Stack} from "react-bootstrap";

export function Home(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {printUsers, removeUser} = UserManager();
    const {apartments} = ApartmentManager();

    const [showPopup, setShowPopup] = useState(false);

    function loginButton() {
        if (loggedIn) {
            localStorage.removeItem('loginUser');
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    const openPopup = () => {
        if (userInfo.id !== 0) {
            setShowPopup(true);
        }
    };
    const closePopup = () => {
        setShowPopup(false);
    };
    const confirmDelete = () => {
        removeUser(userInfo)
        localStorage.removeItem('loginUser');
        props.setLoggedIn(false)
        closePopup();
    };
    const navigateToAddApartment = () => {
        navigate("/add-apartment");
    };

    return (
        <>
            <div className='debugBar'>
                <Stack gap={1}>
                    <button onClick={() => console.log(apartments)}>Print apartments</button>
                    <button onClick={printUsers}>Print users</button>
                </Stack>
            </div>
            <div className="centeredDiv background">
                <div className='whiteBox'>
                    {!loggedIn ?
                        <div style={{fontSize: 14, textAlign: "center"}}>
                            <div className='titleContainer'>Welcome!</div>
                            <div style={{marginBottom: 60}}>Your place to manage the dreams.</div>
                            <Stack style={{alignItems: "center"}} gap={2}>
                                <Button variant='success' style={{width: '300px'}}
                                        onClick={loginButton}>Log in</Button>
                                <Button variant='light' style={{width: '300px', border: '1px solid gray'}}
                                        onClick={() => navigate("/register")}>Sign up</Button>
                            </Stack>
                        </div>
                        :
                        <>
                            <div className='titleContainer'>Welcome, {userInfo.firstname + ' ' + userInfo.lastname}!</div>
                            <Stack gap={2} style={{alignItems: "center"}}>
                                Your email: {userInfo.email}
                                <Button variant='light w300' style={{border: '1px solid gray', marginTop: 20}}
                                        onClick={loginButton}>Log out</Button>
                                <Button variant='danger w300'
                                        onClick={openPopup}>Remove account</Button>
                                <Popup show={showPopup} onClose={closePopup} onConfirm={confirmDelete}/>
                                <Button variant='success w300' style={{marginTop: 20}}
                                        onClick={() => navigate("/apartments")}>Show my apartments</Button>
                                <Button variant='success w300'
                                        onClick={() => navigate("/documents")}>Documents samples</Button>
                                <Button variant='success w300'
                                        onClick={navigateToAddApartment}>Add New Apartment</Button>
                            </Stack>
                        </>
                    }
                </div>
            </div>
        </>
    );
}