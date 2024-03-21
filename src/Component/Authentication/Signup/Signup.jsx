import React, { useState } from 'react'
import "../Static/authentication.css"
import axios from 'axios'

export default function Signup({ apiLink }) {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        userEmail: "",
        userPassword: "",
        confirmPassword: "",
        userPhone: "",
        quation: "",
        userAddress: "",
    });

    const [errors, setErrors] = useState({});

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
        const { firstName, lastName, userEmail, userPassword, confirmPassword, userPhone, userAddress, quation } = userData
        const firstNameIsValid = /[a-zA-z]{1,25}/gi.test(firstName);
        const lastNameIsValid = /[a-zA-z]{1,25}/gi.test(lastName);
        const userEmailIsValid = /[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}/.test(userEmail);
        const userPasswordisValid = /\w{8,25}/gi.test(userPassword);
        const confirmPasswordIsValid = userPassword === confirmPassword;
        const userPhoneIsValid = /01[0125][0-9]{8}/gi.test(userPhone);
        const quationAnswerIsValid = /[a-zA-z]{2,25}/gi.test(quation);
        const userDataValues = Object.values(userData);
        const allIsEmpty = userDataValues.slice(0, userAddress.length - 1).every(
            (element) => element.trim() !== ""
        );
        if (!allIsEmpty)
            setErrors({
                all: " Please make sure to fill in all required fields before proceeding. It appears that some information is missing. Kindly provide valid input for all fields marked as mandatory.",
            });
        else if (!firstNameIsValid)
            setErrors({
                firstName:
                    "Please ensure that your first name contains only alphabetical characters (A-Z or a-z) and is between 1 and 25 characters in length",
            });
        else if (!lastNameIsValid)
            setErrors({
                lastNameName:
                    "Please ensure that your lastn name contains only alphabetical characters (A-Z or a-z) and is between 1 and 25 characters in length",
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
        else if (!confirmPasswordIsValid)
            setErrors({
                confirmPassword:
                    " We noticed that the confirmation password you provided does not match the original password. Please make sure that the confirmation password exactly matches the original password you entered earlier.",
            });
        else if (!userPhoneIsValid)
            setErrors({
                userPhone:
                    "We kindly ask you to provide a valid Egyptian phone number.",
            });
        else if (!quationAnswerIsValid)
            setErrors({
                quation: "You must answer the question."
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
            <section className='signup'>
                <div className="main-title">
                    <h2>Register</h2>
                </div>
                <div className="container">
                    <form className='auth-form' onSubmit={onSubmitHandel}>
                        <div className="input-colaction">
                            <label htmlFor="firstName">First Name *</label>
                            <input onChange={collectUserData} type="text" name='firstName' id='firstName'
                                className={errors.firstName && "not-valid"} />
                            {errors.firstName && <span className='error'>{errors.firstName}</span>}
                        </div>
                        <div className={"input-colaction"}>
                            <label htmlFor="lastName">Last Name *</label>
                            <input onChange={collectUserData} type="text" name='lastName' id='lastName'
                                className={errors.lastName && "not-valid"} />
                            {errors.lastName && <span className='error'>{errors.last}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">Email *</label>
                            <input onChange={collectUserData} type="email" name='userEmail' id='userEmail'
                                className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">Password*</label>
                            <input onChange={collectUserData} type="password" name='userPassword' id='userPassword'
                                className={errors.userPassword && "not-valid"} />
                            {errors.userPassword && <span className='error'>{errors.userPassword}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input onChange={collectUserData} type="password" name='confirmPassword'
                                id='confirmPassword' className={errors.confirmPassword && "not-valid"} />
                            {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPhone">Phone Number *</label>
                            <input onChange={collectUserData} type="text" name='userPhone' id='userPhone'
                                className={errors.userPhone && "not-valid"} />
                            {errors.userPhone && <span className='error'>{errors.userPhone}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userAddress">Address</label>
                            <input onChange={collectUserData} type="text" name='userAddress' id='userAddress' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="quation">What is Your Mother's Name ? *</label>
                            <input onChange={collectUserData} type="text" name='quation' id='quation' />
                        </div>
                        <button type='submit' className={loader ? "disabled btn" : "btn"}>{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : "Register"}</button>
                        {errors.all && <span className='error text-center d-block '>{errors.all}</span>}
                    </form>
                </div>
            </section>
        </>
    )
}
