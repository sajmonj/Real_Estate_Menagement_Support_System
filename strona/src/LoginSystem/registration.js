import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserManager} from "./userManager";

export function Registration(props) {
    const { users, registerUser, initialState } = UserManager();
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

        const user = users.find((user) => user.email === userInfo.email);

        if (user) {
            setEmailError("User with this email already exists");
        } else {
            const newUser = registerUser(userInfo);
            props.setLoggedIn(true)
            props.setUserInfo(newUser)
            navigate("/")
        }
    }

    return (
        <div className="centeredDiv">
            <div>
                <span className="hyperlink text12" onClick={() => navigate("/")}>&lt; Go back to the main page</span>
                <div className="titleContainer">Registration</div>

                <label htmlFor="firstname">Firstname</label><br/>
                <input id="firstname" autoComplete="on"
                    placeholder="Enter your firstname"
                    onChange={ev => userInfoRef.current.firstname = ev.target.value }
                />
                <br/><span className="errorLabel">{firstnameError}</span><br/>

                <label htmlFor="lastname">Lastname</label><br/>
                <input id="lastname" autoComplete="on"
                    placeholder="Enter your lastname"
                    onChange={ev => userInfoRef.current.lastname = ev.target.value }
                />
                <br/><span className="errorLabel">{lastnameError}</span><br/>

                <label htmlFor="email">Email</label><br/>
                <input id="email" autoComplete="email"
                    placeholder="Enter your email here"
                    onChange={ev => userInfoRef.current.email = ev.target.value }
                />
                <br/><span className="errorLabel">{emailError}</span><br/>

                <label htmlFor="password">Password</label><br/>
                <input id="password" type={"password"} autoComplete="new-password"
                    placeholder="Enter your password here"
                    onChange={ev => userInfoRef.current.password = ev.target.value }
                />
                <br/><span className="errorLabel">{passwordError}</span><br/>

                <label htmlFor="repeatedPassword">Repeat your password</label><br/>
                <input id="repeatedPassword" type={"password"} autoComplete="new-password"
                    placeholder="Repeat your password"
                    onChange={ev => repeatedPasswordRef.current = ev.target.value }
                />
                <br/><span className="errorLabel">{repeatedPasswordError}</span><br/><br/>

                <div className="textAlignedCenter">
                    <button className="greenButton" onClick={onButtonClick}>Register</button>
                </div>

                <br/><br/><span>Already have an account? <span className="hyperlink hyperlinkBlue" onClick={() => navigate("/login")}>Log in</span> </span>
            </div>
        </div>

    );
}