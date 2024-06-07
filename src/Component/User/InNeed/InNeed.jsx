import React, { useState } from 'react'
import axios from 'axios'
import querystring from 'querystring';
import useAuth from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2"
import { getFormattedDate } from '../../../utilities/FormatData';
import Joi from 'joi';
import useContent from '../../../utilities/ChangeLanguage';
import { useNavigate } from 'react-router-dom';

export default function AddNeed({ apiLink }) {
    const { userId } = useAuth()
    const content = useContent()
    const navigateTo = useNavigate()
    const [selectedValue, setSelectedValue] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false);
    const [needData, setNeedData] = useState({
        category_id: "",
        title: "",
        quantity: 0,
        weight: 0,
        description: "",
        pub_date: "",
        expiry_date: "",
        active: true,
        user_id: userId
    })

    const handleRadioChange = (event) => {
        const id = +event.target.value
        setSelectedValue(id === 1 ? "food" : null)
        setCategoryId(id)
    };

    const collectDonationData = (event) => {
        const dataItem = { ...needData }
        dataItem[event.target.name] = event.target.value
        setNeedData(dataItem)
    }

    const dataValidation = (data) => {
        setErrors({ all: "" })
        const schema = Joi.object({
            title: Joi.string().min(10).max(35).required(),
            description: Joi.string().min(10).required(),
            category_id: Joi.number().min(1).required(),
            quantity: Joi.number().min(0).required(),
            weight: Joi.number().min(0).required(),
            pub_date: Joi.date().required(),
            expiry_date: Joi.optional(),
            active: true,
            user_id: Joi.number().required()
        })
        const { error } = schema.validate(data, { abortEarly: false })

        if (error) {
            const result = error.details[0].message
            setErrors({ all: result })

        } else {
            return true
        }
    }

    const sendDataToDatabase = async (item) => {
        try {
            setLoader(true)
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
                setTimeout(() => { navigateTo("/user-need") }, 1500)
            } else {
                setErrors({ all: Message });
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    const handelFormSubmit = async (event) => {
        try {
            setLoader(true);
            console.log("loood", loader)
            event.preventDefault();
            const item = { ...needData, pub_date: getFormattedDate(), category_id: categoryId }
            const isValid = dataValidation(item)
            isValid && sendDataToDatabase(item)
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false);
        }
    }

    return (
        <>
            <section className='main-padding-top'>
                <div className="main-title">
                    <h2>Add Need</h2>
                </div>
                <div className="container">
                    <form className='main-form' onSubmit={handelFormSubmit}>

                        <div className="input-colaction">
                            <label htmlFor="title">Title</label>
                            <input onChange={collectDonationData} type="text" name='title' id='title'
                                className={errors.userEmail && "not-valid"} />
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>

                        <div className="input-colaction">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={collectDonationData} name='description' id='description'
                                className={`${errors.userEmail && "not-valid"}`}></textarea>
                            {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                        </div>

                        <div className="donation-type">
                            <h6 className="title">Donation Category</h6>
                            <div className="items">
                                <div className="item">
                                    <label htmlFor="food">Food</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input"
                                        name="category_id" id="food" value={"1"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="clothes">Clothes</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input"
                                        name="category_id" id="clothes" value={"2"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="furnituer">Furnituer</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input"
                                        name="category_id" id="furnituer" value={"3"} />
                                </div>
                                <div className="item">
                                    <label htmlFor="tools">Tools</label>
                                    <input type="radio" onChange={handleRadioChange} className="form-check-input"
                                        name="category_id" id="tools" value={"4"} />
                                </div>
                            </div>
                        </div>

                        {selectedValue === "food" && <>

                            <div className="input-colaction">
                                <label htmlFor="quantity">Quantity</label>
                                <input onChange={collectDonationData} type="number" name='quantity' id='quantity'
                                    className={errors.userEmail && "not-valid"} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>

                            <div className="input-colaction">
                                <label htmlFor="weight">Weight</label>
                                <input onChange={collectDonationData} type="number" name='weight' id='weight'
                                    className={errors.userEmail && "not-valid"} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>
                        </>}

                        <button type='submit' className={loader ? "disabled main-btn" : "main-btn"}>{loader ? <i
                            className="fa-solid fa-spinner fa-spin"></i> : "Add"}</button>
                        {errors.all && <span className='error text-center d-block '>{errors.all}</span>}

                    </form>
                </div>
            </section>
        </>
    )
}