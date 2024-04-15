import axios from 'axios'
import React, { useState } from 'react'
import querystring from 'querystring';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import useLocalization from '../../../Context/LocalizationContext/LoclaesContext';

export default function ResetPassword({ apiLink }) {
    const navigateTo = useNavigate()
    const [newPassword, setNewPassword] = useState("")
    const [errors, setErrors] = useState({})
    const [userAmswer, setUserAnswer] = useState({
        email: "",
        secert: ""
    })

    const { t } = useLocalization()
    const content = (key) => t(`resetPassword.${key}`)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const [loader, setLoader] = useState(false)
    const [userData, setUserData] = useState()

    const collectUserData = (event) => {
        const data = { ...userAmswer }
        data[event.target.name] = event.target.value
        setUserAnswer(data)
    }

    const checkUserAnswer = async () => {
        try {
            setLoader(true)
            const { email, secert } = userAmswer
            const apiUrl = `${apiLink}ForgetPass?email=${email}&secert=${secert}`;
            const { data } = await axios.get(apiUrl);
            const { Code, data: responsData, Message } = data
            if (Code === 200) {
                setIsCorrectAnswer(true)
                setUserData(responsData[0])
            } else {
                setErrors({ all: Message })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    const editPassword = async () => {
        try {
            setLoader(true);
            const apiUrl = `${apiLink}EditUser`;
            const newUserData = { ...userData, password: newPassword }
            setUserData(newUserData)
            const encodedData = querystring.stringify(userData);
            const { data } = await axios.put(apiUrl, encodedData, {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlenc oded'
                    'Content-Type': 'application/json'
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
    }

    const onSubmitHandel = (event) => {
        event.preventDefault();
        if (isCorrectAnswer) {
            editPassword()
        } else {
            checkUserAnswer()
        }
    }

    return (
        <>
            <section className='login'>
                <div className="main-title">
                    <h2>{content("mainTitle")}</h2>
                </div>
                <div className="container">
                    <form className='auth-form mt-5' onSubmit={onSubmitHandel}>

                        {!isCorrectAnswer && <>
                            <div className="input-colaction">
                                <label htmlFor="userEmail">{content("email")}</label>
                                <input onChange={collectUserData} type="email" name='email' id='userEmail' className={errors.userEmail && "not-valid"} value={userAmswer.email && userAmswer.email} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>
                            <div className="input-colaction">
                                <label htmlFor="userPassword">{content("answer")}</label>
                                <input onChange={collectUserData} type="text" name='secert' id='userPassword' className={errors.userPassword && "not-valid"} value={userAmswer.secert && userAmswer.secert} />
                                {errors.userPassword && <span className='error'>{errors.userPassword}</span>}
                            </div>
                            <button type='submit' className={loader ? "disabled btn" : "btn"}>{loader ? <i
                                className="fa-solid fa-spinner fa-spin"></i> : content("getNewPassword")}</button>
                            {errors.all && <span
                                className='error text-center d-block '>{errors.all}</span>}
                        </>}

                        {isCorrectAnswer && <>
                            <h6 className='go-back' onClick={() => setIsCorrectAnswer(false)}> <i className={`fa-solid ${content("dir")} px-1`}></i>{content("goBack")} </h6>
                            <div className="input-colaction">
                                <label htmlFor="password">{content("newPassword")}</label>
                                <input onChange={(event) => setNewPassword(event.target.value)} type="password" name='password' id='password' className={errors.userEmail && "not-valid"} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>
                            <button type='submit' className={loader ? "disabled btn" : "btn"}>{loader ? <i
                                className="fa-solid fa-spinner fa-spin"></i> : content("setNewPassword")}</button>
                            {errors.all && <span
                                className='error text-center d-block '>{errors.all}</span>}
                        </>}

                    </form>
                </div>
            </section>
        </>
    )
}