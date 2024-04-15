import React, { useState } from 'react'
import "../Static/authentication.css"
import axios from 'axios'
import querystring from 'querystring';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import useLocalization from '../../../Context/LocalizationContext/LoclaesContext';

export default function Signup({ apiLink }) {
    const [userData, setUserData] = useState({
        user_name: "",
        password: "",
        mobile_number: "",
        secert_answer: "",
        address: null,
        is_admin: null,
        first_name: null,
        last_name: null,
        email: "",
        image_path: null,
        location_lat: null,
        location_long: null,
        id_number: null,
        attachments_path: null
    });
    const { t } = useLocalization()
    const content = (key) => t(`signup.${key}`)

    const navigateTo = useNavigate()
    const [errors, setErrors] = useState({});

    const [loader, setLoader] = useState(false);

    const collectUserData = (event) => {
        const user = { ...userData };
        user[event.target.name] = event.target.value.trim();
        user.user_name = `${user.first_name} ${user.last_name}`
        setUserData(user);
    };

    const sendUserDataToDatabase = async () => {
        try {
            setLoader(true);
            const apiUrl = `${apiLink}AddUser`;
            const encodedData = querystring.stringify(userData);
            const { data } = await axios.post(apiUrl, encodedData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })

            const { Code, Message } = data;
            if (Code === 200) {
                Swal.fire({
                    position: "center-start",
                    icon: "success",
                    title: Message,
                    showConfirmButton: false,
                    timer: 1000
                });
                setTimeout(() => { navigateTo("/signin") }, 1500)
            } else {
                setErrors({ all: Message });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    };

    // Valid Data Function
    function dataValdtion() {
        setErrors({});
        const { first_name, last_name, email, password, confirmPassword, mobile_number, address, secert_answer } = userData
        const firstNameIsValid = /[a-zA-z]{1,25}/gi.test(first_name);
        const lastNameIsValid = /[a-zA-z]{1,25}/gi.test(last_name);
        const userEmailIsValid = /[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}/.test(email);
        const userPasswordisValid = /\w{8,25}/gi.test(password);
        const confirmPasswordIsValid = password === confirmPassword;
        const userPhoneIsValid = /01[0125][0-9]{8}/gi.test(mobile_number);
        const quationAnswerIsValid = /[a-zA-z]{2,25}/gi.test(secert_answer);
        const userDataValues = Object.values(userData);
        const allIsEmpty = userDataValues.slice(0, userData.length - 1).every(
            (element) => element.trim() !== ""
        );
        if (!allIsEmpty)
            setErrors({
                all: content("missingFieldsError")
            });
        else if (!firstNameIsValid)
            setErrors({
                firstName: content("firstNameError")
            });
        else if (!lastNameIsValid)
            setErrors({
                lastNameName: content("lastNameError")
            });
        else if (!userEmailIsValid)
            setErrors({
                userEmail: content("emailError")
            });
        else if (!userPasswordisValid)
            setErrors({
                userPassword: content("passwordError")
            });
        else if (!confirmPasswordIsValid)
            setErrors({
                confirmPassword: content("confirmPasswordError")
            });
        else if (!userPhoneIsValid)
            setErrors({
                userPhone: content("phoneNumberError")
            });
        else if (!quationAnswerIsValid)
            setErrors({
                quation: content("questionError")
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
                    <h2>{content("title")}</h2>
                </div>
                <div className="container">
                    <form className='auth-form' onSubmit={onSubmitHandel}>
                        <div className="input-colaction">
                            <label htmlFor="firstName">{content("firstName")}</label>
                            <input onChange={collectUserData} type="text" name='first_name' id='firstName'
                                className={errors.firstName && "not-valid"} />
                            {errors.firstName && <span className='error'>{errors.firstName}</span>}
                        </div>
                        <div className={"input-colaction"}>
                            <label htmlFor="lastName">{content("lastName")}</label>
                            <input onChange={collectUserData} type="text" name='last_name' id='lastName'
                                className={errors.lastName && "not-valid"} />
                            {errors.lastName && <span className='error'>{errors.last}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">{content("email")}</label>
                            <input onChange={collectUserData} type="email" name='email' id='userEmail'
                                className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">{content("password")}</label>
                            <input onChange={collectUserData} type="password" name='password' id='userPassword'
                                className={errors.userPassword && "not-valid"} />
                            {errors.userPassword && <span className='error'>{errors.userPassword}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="confirmPassword">{content("confirmPassword")}</label>
                            <input onChange={collectUserData} type="password" name='confirmPassword'
                                id='confirmPassword' className={errors.confirmPassword && "not-valid"} />
                            {errors.confirmPassword && <span className='error'>{errors.confirmPassword}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPhone">{content("phoneNumber")}</label>
                            <input onChange={collectUserData} type="text" name='mobile_number' id='userPhone'
                                className={errors.userPhone && "not-valid"} />
                            {errors.userPhone && <span className='error'>{errors.userPhone}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userAddress">{content("address")}</label>
                            <input onChange={collectUserData} type="text" name='address' id='userAddress' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="quation">{content("question")}</label>
                            <input onChange={collectUserData} type="text" name='secert_answer' id='quation' />
                        </div>
                        <button type='submit' className={loader ? "disabled btn" : "btn"}>{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : content("registerButton")}</button>
                        {errors.all && <span className='error text-center d-block '>{errors.all}</span>}
                    </form>
                </div>
            </section>
        </>
    )
}
