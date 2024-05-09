import "../../Authentication/Static/authentication.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import querystring from 'querystring';
import "../user.css"
import useAuth from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2"
// import uploadImageToDatabase from "../../../utilities/uploadImageToDatabase";
// import useContent from '../../../utilities/ChangeLanguage';

export default function AddDonaiation({ apiLink }) {
    const { userId } = useAuth()

    const [selectedValue, setSelectedValue] = useState(null);
    const [errors, setErrors] = useState({})
    const [pubDate, setPubDate] = useState("")
    const [loader, setLoader] = useState(false);
    const [donationData, setDonationData] = useState({
        category_id: "",
        title: "",
        image_path: "",
        quantity: "",
        weight: "",
        description: "",
        pub_date: "",
        expiry_date: "",
        active: true,
        user_id: userId
    })


    const handleRadioChange = (event) => {
        const id = +event.target.value
        setDonationData({ ...donationData, category_id: id })
        setSelectedValue(id === 1 ? "food" : null)
    };



    const collectDonationData = (event) => {
        const dataItem = { ...donationData, pub_date: pubDate }
        dataItem[event.target.name] = event.target.value
        setDonationData(dataItem)
    }

    const sendDataToDatabase = async () => {
        try {
            const item = { ...donationData, pub_date: pubDate }
            const apiUrl = `${apiLink}AddInneed`;
            const encodedData = querystring.stringify(item);
            const { data } = await axios.post(apiUrl, encodedData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const { Code, Message } = data;
            console.log({ data })
            if (Code === 200) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: Message,
                    showConfirmButton: false,
                    timer: 1200
                });
                // setTimeout(() => { navigateTo("/signin") }, 1500)
            } else {
                setErrors({ all: Message });
            }
        } catch (error) {
            console.log(error)
        }
    }



    const handelFormSubmit = async (event) => {
        setLoader(true);
        event.preventDefault();
        sendDataToDatabase()
        setLoader(false);
    }


    useEffect(() => {
        let date = new Date()
        date = date.toLocaleString()
        setPubDate(date)
    }, [])


    return (
        <>
            <section className='main-padding-top'>
                <div className="main-title">
                    <h2>Add Need</h2>
                </div>
                <div className="container">
                    <form className='user-form' onSubmit={handelFormSubmit}>

                        <div className="input-colaction">
                            <label htmlFor="title">Title</label>
                            <input onChange={collectDonationData} type="text" name='title' id='title' className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>

                        <div className="input-colaction">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={collectDonationData} name='description' id='description' className={`${errors.userEmail && "not-valid"}`} ></textarea>
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>


                        <div className="donation-type">
                            <h6 className="title">Donation Category</h6>
                            <div className="items">
                                <div className="item">
                                    <label htmlFor="food">Food</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input" name="category_id" id="food" value={"1"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="clothes">Clothes</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input" name="category_id" id="clothes" value={"2"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="furnituer">Furnituer</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input" name="category_id" id="furnituer" value={"3"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="tools">Tools</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input" name="category_id" id="tools" value={"4"} />
                                </div>
                            </div>
                        </div>

                        {selectedValue === "food" && <>

                            <div className="input-colaction">
                                <label htmlFor="quantity">Quantity</label>
                                <input onChange={collectDonationData} type="number" name='quantity' id='quantity' className={errors.userEmail && "not-valid"} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>

                            <div className="input-colaction">
                                <label htmlFor="weight">Weight</label>
                                <input onChange={collectDonationData} type="number" name='weight' id='weight' className={errors.userEmail && "not-valid"} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>
                        </>}

                        <button type='submit' className={loader ? "disabled btn" : "btn"} >{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : "Add"}</button>
                    </form>
                </div>
            </section>
        </>
    )
}

