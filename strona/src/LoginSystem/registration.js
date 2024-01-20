import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserManager} from "./userManager";
import {Button} from "react-bootstrap";

export function Registration(props) {
    const { getUserByEmail, registerUser, initialState } = UserManager();
    const userInfoRef = useRef(initialState);
    const repeatedPasswordRef = useRef("");
    const [firstnameError, setFirstnameError] = useState("")
    const [lastnameError, setLastnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [repeatedPasswordError, setRepeatedPasswordError] = useState("")

    const navigate = useNavigate();

    function onButtonClick() {
        setFirstnameError("")
        setLastnameError("")
        setEmailError("")
        setPasswordError("")
        setRepeatedPasswordError("")

        const userInfo = userInfoRef.current;
        const repeatedPassword = repeatedPasswordRef.current;

        if ("" === userInfo.firstname) {
            setFirstnameError("Please enter your firstname")
            return
        }
        if (!/^[a-zA-Z]+$/.test(userInfo.firstname)) {
            setFirstnameError("Please enter your real firstname")
            return
        }
        if ("" === userInfo.lastname) {
            setLastnameError("Please enter your lastname")
            return
        }
        if (!/^[a-zA-Z]+$/.test(userInfo.lastname)) {
            setLastnameError("Please enter your real lastname")
            return
        }
        if ("" === userInfo.email) {
            setEmailError("Please enter your email")
            return
        }
        if (!/^[\w-x.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userInfo.email)) {
            setEmailError("Please enter a valid email")
            return
        }
        if ("" === userInfo.password) {
            setPasswordError("Please enter a password")
            return
        }
        if (userInfo.password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }
        if ("" === repeatedPassword) {
            setRepeatedPasswordError("Please repeat your password")
            return
        }
        if (userInfo.password !== repeatedPassword) {
            setRepeatedPasswordError("Repeated password id different than the original password")
            return
        }

        const user = getUserByEmail(userInfo);

        if (user) {
            setEmailError("User with this email already exists");
        } else {
            const newUser = registerUser(userInfo);
            props.setLoggedIn(true);
            props.setUserInfo(newUser);
            localStorage.setItem('loginUser', JSON.stringify({loggedUserInfo: user, loggedDate: Date.now()}));
            navigate("/");
        }
    }

    return (
        <div className="centeredDiv background">
            <div className='whiteBox' style={{paddingTop: 50, paddingBottom: 50}}>
                <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
                <div className="titleContainer">Registration</div>

                <label htmlFor="firstname" className='topMargin' >Firstname</label><br/>
                <input id="firstname" autoComplete="on"
                    placeholder="Enter your firstname"
                    onChange={ev => userInfoRef.current.firstname = ev.target.value }
                />
                <br/><span className="errorLabel">{firstnameError}</span>

                <label htmlFor="lastname" className='topMargin'>Lastname</label><br/>
                <input id="lastname" autoComplete="on"
                    placeholder="Enter your lastname"
                    onChange={ev => userInfoRef.current.lastname = ev.target.value }
                />
                <br/><span className="errorLabel">{lastnameError}</span>

                <label htmlFor="email" className='topMargin'>Email</label><br/>
                <input id="email" autoComplete="email"
                    placeholder="Enter your email here"
                    onChange={ev => userInfoRef.current.email = ev.target.value }
                />
                <br/><span className="errorLabel">{emailError}</span>

                <label htmlFor="password" className='topMargin'>Password</label><br/>
                <input id="password" type={"password"} autoComplete="new-password"
                    placeholder="Enter your password here"
                    onChange={ev => userInfoRef.current.password = ev.target.value }
                />
                <br/><span className="errorLabel">{passwordError}</span>

                <label htmlFor="repeatedPassword" className='topMargin'>Repeat your password</label><br/>
                <input id="repeatedPassword" type={"password"} autoComplete="new-password"
                    placeholder="Repeat your password"
                    onChange={ev => repeatedPasswordRef.current = ev.target.value }
                />
                <br/><span className="errorLabel">{repeatedPasswordError}</span>

                <div className="textAlignedCenter" style={{marginTop: 30}}>
                    <Button variant='success' style={{width: '300px'}}
                            onClick={onButtonClick}>Register</Button>
                </div>

                <br/><br/><span>Already have an account? <span className="hyperlink hyperlinkBlue" onClick={() => navigate("/login")}>Log in</span> </span>
            </div>
        </div>

    );
}