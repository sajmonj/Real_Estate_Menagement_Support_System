import React from "react"
import {useNavigate} from "react-router-dom";
import {UserManager} from "./LoginSystem/userManager";
import {ApartmentManager} from "./apartmentSystem/apartmentManager";


export function Home(props) {
    const {loggedIn, userInfo} = props
    const navigate = useNavigate();
    const {users, removeUser} = UserManager()
    const {apartments} = ApartmentManager();


    function loginButton() {
        if (loggedIn) {
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        } else {
            navigate("/login")
        }
    }

    function handleRemoveUser() {
        if (userInfo.id !== 0) {
            removeUser(userInfo.id)
            localStorage.removeItem("user")
            props.setLoggedIn(false)
        }
    }

    return (
        <div className="centeredDiv">
            <button onClick={() => console.log(apartments)}>Console print apartments</button>
            <button onClick={() => console.log(users)}>Console print users</button>

            <div className="mainContainer centered">
                <div className="titleContainer">
                    <div>Welcome!</div>
                </div>

                <div>This is the home page.</div>
                <br/><br/><br/>
                <div className="buttonContainer">
                    <input
                        className="inputButton greenButton"
                        type="button"
                        onClick={loginButton}
                        value={loggedIn ? "Log out" : "Log in"} />
                    {(!loggedIn ? <input
                        className="inputButton whiteButton"
                        type="button"
                        onClick={() => navigate("/register")}
                        value={"Sign up"} /> : <div/> )}
                </div>
            </div>
            {(loggedIn ?
                <>
                    <div>
                        <br/> ID: {userInfo.id}
                        <br/> Firstname: {userInfo.firstname} {userInfo.lastname}
                        <br/> Email: {userInfo.email}
                        <br/> Password: {userInfo.password}
                        <br/><br/>
                    </div>
                    <input
                        className="inputButton redButton"
                        type="button"
                        onClick={handleRemoveUser}
                        value={"Remove account"} />
                    <input
                        className="inputButton greenButton longerButton"
                        type="button"
                        onClick={() => navigate("/apartments")}
                        value={"Show my apartments"} />
                </> : <div/> )}
        </div>
    );
}