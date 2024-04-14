import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import useAuth from '../../../Context/AuthContext/AuthContext';
import "../Static/authentication.css"

export default function Signin({ apiLink }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const navigatTo = useNavigate()

    const { saveUserData, setIsLoggedIn } = useAuth()

    const [errors, setErrors] = useState({});

    const [loader, setLoader] = useState(false);

    const collectUserData = (event) => {
        const user = { ...userData };
        user[event.target.name] = event.target.value.trim();
        setUserData(user);
    };

    const sendUserDataToDatabase = async () => {
        try {
            setLoader(true);
            const { email, password } = userData
            const apiUrl = `${apiLink}GetUser?email=${email}&password=${encodeURIComponent(password)}`;
            const { data } = await axios.get(apiUrl);
            const { Code, data: responsData, Message } = data
            console.log(userData)
            if (Code === 200) {
                localStorage.setItem("user", JSON.stringify(responsData))
                setIsLoggedIn(true)
                saveUserData()
                navigatTo("/")
            } else {
                setErrors({ all: Message })
            }
            setLoader(false);
        } catch (error) {
            console.error(error)
            setLoader(false);
        }
    };

    // Valid Data Function
    function dataValdtion() {
        setErrors({});
        const { email, password } = userData
        const userEmailIsValid = /[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}/.test(email);
        const userPasswordisValid = /\w{8,25}/gi.test(password);
        const userDataValues = Object.values(userData);
        const allIsEmpty = userDataValues.every((element) => element.trim() !== "");
        if (!allIsEmpty)
            setErrors({
                all: " Please make sure to fill in all required fields before proceeding. It appears that some information is missing. Kindly provide valid input for all fields marked as mandatory.",
            });
        else if (!userEmailIsValid)
            setErrors({
                userEmail:
                    "Please make sure to enter your email address in the correct format. It should follow the standard email pattern, such as example@example.com. Ensure there are no spaces or special characters in the email address, and it includes both a username and domain name separated by '@'.      ",
            });
        else if (!userPasswordisValid)
            setErrors({
                userPassword:
                    " Please ensure that your password meets the following criteria: It must be between 8 and 25 characters long.It can contain any combination of alphanumeric characters(letters and numbers), as well as the following special characters: ! @ # $ % & *No spaces are allowed in the password.",
            });
        else
            return true
    }

    const onSubmitHandel = (event) => {
        event.preventDefault();
        const isValid = dataValdtion();
        isValid && sendUserDataToDatabase()
    };

    return (
        <>
            <section className='login'>
                <div className="main-title">
                    <h2>Log in</h2>
                </div>
                <div className="container">
                    <form className='auth-form mt-5' onSubmit={onSubmitHandel}>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">Email *</label>
                            <input onChange={collectUserData} type="email" name='email' id='userEmail' className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">Password*</label>
                            <input onChange={collectUserData} type="password" name='password' id='userPassword' className={errors.userPassword && "not-valid"} />
                            {errors.userPassword && <span className='error'>{errors.userPassword}</span>}
                        </div>
                        <button type='submit' className={loader ? "disabled btn" : "btn"}>{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : "Log in"}</button> {errors.all && <span
                                className='error text-center d-block '>{errors.all}</span>}
                    </form>
                </div>
            </section>
        </>
    )

}
