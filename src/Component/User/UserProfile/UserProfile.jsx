import React, { useEffect, useState } from 'react'
import useAuth from '../../../Context/AuthContext/AuthContext'
import "./user-profile.css"
import userPlacholder from "./831.jpg"
import useContent from '../../../utilities/ChangeLanguage'
export default function UserProfile() {
    const [userData, setUserData] = useState({})
    const [errors, setErrors] = useState({})
    const [uploadImage, setUploadImage] = useState()
    const content = useContent()
    const { isloggedIn } = useAuth()
    const getUserData = () => {
        if (isloggedIn) {
            const data = localStorage.getItem("user")
            setUserData(JSON.parse(data)[0])
        }
    }

    useEffect(() => {
        getUserData()
        setUploadImage(userPlacholder)
        setErrors({})
    }, [])

    const collectUserData = (event) => {

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <section className='user-profile main-padding-top '>
                <div className="main-title">
                    {/* <h2>{content("login")}</h2> */}
                    <h2>User Profile</h2>
                </div>
                <div className="container py-3 mt-3">
                    <form action="">
                        <div className="row d-flex justify-content-center w-100 g-3 align-items-center">
                            <div className="col-12 col-md-7 row data p-0">
                                <div className="col-12 ">
                                    <div className="input-colaction bg-light">
                                        <label htmlFor="user_name"> Name</label>
                                        <input onChange={collectUserData} type="text" name='user_name' id='user_name' disabled

                                            className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.user_name} />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="input-colaction bg-light">
                                        <label htmlFor="first_name"> First Name</label>
                                        <input onChange={collectUserData} type="text" name='first_name' id='first_name' disabled

                                            className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.first_name} />

                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="input-colaction bg-light">
                                        <label htmlFor="last_name"> Last Name</label>
                                        <input onChange={collectUserData} type="text" name='last_name' id='last_name' disabled

                                            className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.last_name} />

                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="input-colaction bg-light">
                                        <label htmlFor="address">Address</label>
                                        <input onChange={collectUserData} type="text" name='address' id='address' disabled

                                            className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.address} />

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-3 text-center m-0 order-sm-1">
                                <div className="img text-center">
                                    <img src={userData.image_path ? userData.image_path : uploadImage}
                                        alt={userData.user_name} />

                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center w-100">
                            <div className="col-md-10 col-12">
                                <div className="input-colaction bg-light">
                                    <label htmlFor="email"> Email</label>
                                    <input onChange={collectUserData} type="email" name='email' id='email' disabled

                                        className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.email} />

                                </div>
                            </div>


                            <div className="col-md-5 col-12">
                                <div className="input-colaction bg-light">
                                    <label htmlFor="mobile_number"> Phone</label>
                                    <input onChange={collectUserData} type="text" name='mobile_number' id='mobile_number'
                                        disabled
                                        className={`${errors.userEmail && "not-valid"} `}
                                        defaultValue={userData.mobile_number} />

                                </div>
                            </div>
                            <div className="col-md-5 col-12">
                                <div className="input-colaction bg-light">
                                    <label htmlFor="test"> Email</label>
                                    <input onChange={collectUserData} type="email" name='test' id='test' disabled

                                        className={`${errors.userEmail && "not-valid"} `} defaultValue={userData.email} />
                                    {/* {errors.userEmail && <span className='error'>{errors.userEmail}</span>}*/}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
