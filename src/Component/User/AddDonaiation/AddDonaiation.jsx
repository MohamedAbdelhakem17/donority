import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import querystring from 'querystring';
import Swal from "sweetalert2"
import useAuth from "../../../Context/AuthContext/AuthContext";
import { getFormattedDate } from "../../../utilities/FormatData";
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import useContent from '../../../utilities/ChangeLanguage';

export default function AddDonaiation({ apiLink }) {
    const { userId } = useAuth()
    const imageFile = useRef()
    const navigateTo = useNavigate()
    const [imageName, setImageName] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [errors, setErrors] = useState({})
    const [loader, setLoader] = useState(false);
    const [donationData, setDonationData] = useState({
        category_id: null,
        title: "",
        image_path: "",
        quantity: 0,
        weight: 0,
        expiry_date: "",
        description: "",
        pub_date: "",
        active: true,
        user_id: ""
    })

    const handleRadioChange = (event) => {
        const id = +event.target.value
        setCategoryId(id)
        console.log(id)
        setSelectedValue(id === 1 ? "food" : null)
        setDonationData({
            ...donationData, quantity: id === 1 ? 1 : 0,
            weight: id === 1 ? 1 : 0,
            expiry_date: "", category_id: id
        })
    };

    const handelImageName = (event) => {
        const imageName = event.target.files[0]?.name
        setImageName(imageName)
    }

    const collectDonationData = (event) => {
        const dataItem = { ...donationData, pub_date: getFormattedDate() }
        dataItem[event.target.name] = event.target.value
        setDonationData(dataItem)
    }

    const uploadImageToDatabase = async () => {
        try {
            const formData = new FormData();
            const img = imageFile.current.files[0];
            formData.append("", img)
            let url = `${apiLink}/uploadPic`;
            let { data } = await axios.post(url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (data.Code === 200) {
                return data.fileName
            } else {
                return false
            }
        } catch (error) {
            console.error(error)
        }
    }

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const test = useContent("test")



    const dataValidation = (data) => {
        setErrors({ all: "" });
        const isRequired = categoryId === 1;
        console.log(isRequired)
        const schema = Joi.object({
            title: Joi.string().min(10).max(35).required(),
            description: Joi.string().min(10).required(),
            image_path: Joi.string().min(0),
            category_id: Joi.number().min(1).required(),
            quantity: Joi.number().min(0).required(),
            weight: Joi.number().min(0).required(),
            pub_date: Joi.date().required(),
            expiry_date: isRequired ? Joi.date().min(getTodayDate()).required() : Joi.string().min(0),
            active: Joi.boolean().required(),
            user_id: Joi.number().required()
        });
        const { error } = schema.validate(data, { abortEarly: true });

        if (error) {
            const result = error.details[0].message;
            setErrors({ all: result });
        } else {
            return true;
        }
    };

    const sendDataToDatabase = async (item) => {
        try {
            const apiUrl = `${apiLink}AddDonation`;
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
                setTimeout(() => { navigateTo("/user-donation") }, 1500)
            } else {
                setErrors({ all: Message });
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handelFormSubmit = async (event) => {
        try {
            setLoader(true);
            event.preventDefault();
            const img = imageFile.current.files[0];
            if (img) {
                const imagePath = await uploadImageToDatabase()
                const item = {
                    ...donationData, pub_date: getFormattedDate(), user_id: userId, image_path: imagePath, category_id: categoryId
                }

                const isValid = dataValidation(item)
                isValid && console.log(item)
                isValid && sendDataToDatabase(item)
            } else {
                const item = { ...donationData, pub_date: getFormattedDate(), image_path: "", user_id: userId, category_id: categoryId }
                const isValid = dataValidation(item)
                isValid && sendDataToDatabase(item)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoader(false);
        }

    }



    return (
        <>
            <section className='main-padding-top add-donation'>
                <div className="main-title">
                    <h2>Add Donation</h2>
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

                        <div className="input-colaction">
                            <label htmlFor="image_path" className="add-image">{imageName ? imageName : "Add Image"} <i
                                className="fa-solid fa-file-image"></i></label>
                            <input onChange={handelImageName} type="file" name='image_path' id='image_path'
                                className={errors.userEmail && "not-valid"} ref={imageFile} />
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
                                    className={errors.userEmail && "not-valid"} value={1} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>

                            <div className="input-colaction">
                                <label htmlFor="weight">Weight</label>
                                <input onChange={collectDonationData} type="number" name='weight' id='weight'
                                    className={errors.userEmail && "not-valid"} value={1} />
                                {errors.userEmail && <span className='error'>{errors.userEmail}</span>}
                            </div>

                            <div className="input-colaction">
                                <label htmlFor="expiry_date">Expiry Date</label>
                                <input onChange={collectDonationData} type="date" name='expiry_date' id='expiry_date'
                                    className={errors.userEmail && "not-valid"} min={getTodayDate()} />
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