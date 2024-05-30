import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../../Context/AuthContext/AuthContext';
import useContent from '../../../utilities/ChangeLanguage';

export default function Signin({ apiLink }) {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const content = useContent("signin")


    const navigatTo = useNavigate()

    const { saveUserData, setIsLoggedIn } = useAuth()

    const [errors, setErrors] = useState({});

    const [loader, setLoader] = useState(false);
    const [passwordShowToggel, setShowPasswordToggel] = useState(false)

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

    function dataValdtion() {
        setErrors({});
        const { email, password } = userData
        const userEmailIsValid = /[\w.-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}/.test(email);
        const userPasswordisValid = /\w{8,25}/gi.test(password);
        const userDataValues = Object.values(userData);
        const allIsEmpty = userDataValues.every((element) => element.trim() !== "");
        if (!allIsEmpty)
            setErrors({
                all: content("allError")
            });
        else if (!userEmailIsValid)
            setErrors({
                userEmail: content("userEmailError")
            });
        // else if (!userPasswordisValid)
        //     setErrors({
        //         userPassword: content("userPasswordError")
        //     });
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
            <section className='login main-padding-top'>
                <div className="main-title">
                    <h2>{content("login")}</h2>
                </div>
                <div className="container">
                    <form className='main-form mt-5' onSubmit={onSubmitHandel}>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">{content("email")}</label>
                            <input onChange={collectUserData} type="email" name='email' id='userEmail' className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">{content("password")}</label>
                            <div className='w-100 position-relative'>
                                <input onChange={collectUserData} type={passwordShowToggel ? "text" : "password"} name='password' id='userPassword' className={errors.userPassword && "not-valid"} />
                                <i className={`fa-regular fa-${passwordShowToggel ? "eye-slash" : "eye"} toggel-password `} onClick={() => setShowPasswordToggel(!passwordShowToggel)}></i>
                            </div>
                            <Link to={"/reset-password"} className="link-form">{content("forget_password")}</Link>
                            {errors.userPassword && <span className='error'>{errors.userPassword}</span>}
                        </div>
                        <button type='submit' className={loader ? "disabled main-btn" : "main-btn"}>{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : content("button")}</button>
                        <p className='text-muted h5'> {content("new_account")}<Link to={"/signup"} className="link-form">{content("register")}</Link></p>
                        {errors.all && <span
                            className='error text-center d-block '>{errors.all}</span>}
                    </form>
                </div>
            </section>
        </>
    )

}
