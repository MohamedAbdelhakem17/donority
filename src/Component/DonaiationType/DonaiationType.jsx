import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "./donaiationType.css"
import useContent from '../../utilities/ChangeLanguage'
import placholder from "./placholder.jpg"
import axios from 'axios'
import Swal from 'sweetalert2'

export default function DonaiationType({ apiLink }) {
    const { type } = useParams()
    const [active, setActive] = useState(type)
    const [donation, setDonation] = useState([])
    const content = useContent("donation")
    const navigate = useNavigate();
    const imageLink = "https://api.donority.site/images/"

    let donationId

    if (type === "food")
        donationId = 1
    else if (type === "clothes")
        donationId = 2
    else if (type === "tools")
        donationId = 4
    else if (type === "furniture")
        donationId = 3


    const handleOptionClick = (type) => {
        setActive(type);
        navigate(`/donaiton/${type}`);
    };

    const getDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}GetDonations?cat_id=${id}`
            const { data } = await axios(apiUrl)
            const { Code, data: dataRespons } = data
            if (Code === 200)
                setDonation(dataRespons)
            else
                setDonation([])

            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const orderDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}ReserveDonation?ID=${id}`;
            const { data } = await axios(apiUrl);
            const { Code, Message, data: responseData } = data;
            console.log(data);
            if (Code === 200) {
                Swal.fire({
                    title: "Success",
                    text: Message,
                    icon: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Show Owner Info"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            html: `
                                <div class='userinfo'>
                                <h5 class="alert alert-danger p-1 m-0 mb-2">Please remember to save this information,it Will be lost.</h5>
                                    <h6 class='title'>Name</h6>
                                    <p> ${responseData.OwnerDetails.firstname} ${responseData.OwnerDetails.lasrname}</p>
                                    <h6 class='title'>Address</h6>
                                    <p> ${responseData.OwnerDetails.adress}</p>
                                    <h6 class='title'>Email</h6>
                                    <p>${responseData.OwnerDetails.email}</p>
                                    <h6 class='title'>Phone</h6>
                                    <p>${responseData.OwnerDetails.phonenumber}</p>
                                </div>
                            `,
                            confirmButtonColor: "#3085d6",

                        });
                    }
                });
                // Assuming donationId is defined somewhere, pass it to getDonation function
                getDonation(donationId);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDonation(donationId)
    }, [type])


    return (
        <>
            <section className='main-padding-top donaiation-type' >
                <div className="container py-2">
                    <ul className="options d-flex justify-content-center align-items-center gap-5 mt-3">
                        <li className={`option ${active === "food" && "active"}`} onClick={() => handleOptionClick("food")}>{content("food")}</li>
                        <li className={`option ${active === "clothes" && "active"}`} onClick={() => handleOptionClick("clothes")}>{content("clothes")}</li>
                        <li className={`option ${active === "tools" && "active"}`} onClick={() => handleOptionClick("tools")}>{content("tools")}</li>
                        <li className={`option ${active === "furniture" && "active"}`} onClick={() => handleOptionClick("furniture")}>{content("furniture")}</li>
                    </ul>
                    {donation.length > 0
                        ? <div className="row justify-content-center align-items-center">
                            {donation.filter((item) => item.active).map((item) => {
                                const date = new Date(item.pub_date);

                                const year = date.getFullYear();
                                const month = date.getMonth() + 1;
                                const day = date.getDate();

                                // let hours = date.getHours();
                                // let minutes = date.getMinutes();
                                // const ampm = hours >= 12 ? 'PM' : 'AM';
                                // hours = hours % 12 || 12;
                                // minutes = minutes < 9 ? `0${minutes}` : minutes
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 p-2" key={item.serial}>
                                        <div className="inner ">
                                            <div className="image w-100">
                                                <img src={item.image_path ? `${imageLink}${item.image_path} ` : placholder} alt={item.title} className='w-100' />
                                            </div>
                                            <div className="content p-2">
                                                <h5>{item.title}</h5>
                                                <p>{item.description}</p>
                                                <h6 className='time'>
                                                    <span>{`${year}-${month}-${day}`}</span>
                                                    {/* <span>{`${hours}:${minutes} ${ampm}`}</span> */}
                                                </h6>
                                                <span className="type">{type}</span>
                                                {
                                                    type === "food" && <>
                                                        <span className="type">weight: {item.weight} kg</span>
                                                        <span className="type">Quantity: {item.quantity}</span>
                                                    </>
                                                }
                                                <button onClick={() => orderDonation(item.serial)} className='d-flex align-items-center justify-content-around link'> <span><i className="fa-solid fa-plus"></i></span>  <span>Order</span></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="loading container d-flex align-items-center justify-content-center fw-bolder text-primary mt-5 pt-5">
                            <i className="fa-solid fa-spinner fa-spin fa-8x mt-5 pt-5"></i>
                        </div>

                    }
                </div>
            </section>
        </>
    )
}
