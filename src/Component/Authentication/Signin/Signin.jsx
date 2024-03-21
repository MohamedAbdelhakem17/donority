import axios from 'axios';
import React, { useState } from 'react'

export default function Signin({apiLink}) {
    const [userData, setUserData] = useState({
        userEmail: "",
        userPassword: "",
    });


    const [errors, setErrors] = useState({apiLink});

    const [loader, setLoader] = useState(false);

    const collectUserData = (event) => {
        const user = { ...userData };
        user[event.target.name] = event.target.value.trim();
        setUserData(user);
    };

    const sendUserDataToDatabase = async () => {
        setLoader(true);
        const apiUrl = `${apiLink}/users`;
        const { data } = await axios.post(apiUrl, userData);
        if (data) {
            // Show a user alert indicating successful sign-up and navigate to the login page after 2 seconds
            console.log(data)
        } else {
            // // Display any errors returned from the response. This involves showing any error messages or information included in the response .
            console.log(false)
        }
        setLoader(false);
    };

    // Valid Data Function
    function dataValdtion() {
        setErrors({});
        const { userEmail, userPassword } = userData
        const userEmailIsValid = /[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}/.test(userEmail);
        const userPasswordisValid = /\w{8,25}/gi.test(userPassword);
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
                            <input onChange={collectUserData} type="email" name='userEmail' id='userEmail' className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">Password*</label>
                            <input onChange={collectUserData} type="password" name='userPassword' id='userPassword' className={errors.userPassword && "not-valid"} />
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
