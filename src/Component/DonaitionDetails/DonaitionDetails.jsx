import React from 'react'
import "./donation-details.css"
import useGetOneItem from '../../Context/ItemDetails/ItemDetailsContext'
import placholder from "./placholder.jpg"
import formatDate from '../../utilities/FormatData'
import axios from 'axios'
import useAuth from '../../Context/AuthContext/AuthContext'
import { json, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function DonaitionDetails({ apiLink }) {
    const imageLink = "https://api.donority.site/images/"
    const navigatTo = useNavigate()
    const { details } = useGetOneItem()
    const { isloggedIn, userId } = useAuth()

    const orderDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}ReserveDonation?ID=${id}`;
            const { data } = await axios(apiUrl);
            const { Code, Message, data: responseData } = data;
            if (Code === 200) {
                const fullData = { ...responseData.OwnerDetails, donationId: id, userOrderd: userId }
                const orderList = [fullData]
                if (localStorage.getItem("donationList") !== null) {
                    const data = JSON.parse(localStorage.getItem("donationList"))
                    data.push(fullData)
                    localStorage.setItem("donationList", JSON.stringify(data))
                } else {
                    localStorage.setItem("donationList", JSON.stringify(orderList))
                }
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: Message,
                    showConfirmButton: false,
                    timer: 1000
                });
                setTimeout(() => {
                    navigatTo("/user-request/needs")
                }, 1000)
            }
        } catch (error) {
            console.error(error);
        }
    };

    const goToLogin = () => {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "User Not Logged In ",
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(() => {
            navigatTo("/signin")
        }, 1000)
    }
    const handelOrderDonation = (id) => {
        isloggedIn ? orderDonation(id) : goToLogin(id)
    }

    return (<>
        <section className='donation-details main-padding-top px-5'>
            <div className="container-fluaid  pt-3">
                <div className="row flex-md-row flex-sm-column-reverse justify-content-between">
                    <div className="col-md-4 col-12 pb-3">
                        <img src={details.image_path ? `${imageLink}${details.image_path}` : `${placholder}`} alt={details.title} />
                    </div>
                    <div className="col-md-7 col-12 pb-3">
                        <div className="px-2 content">
                            <div className="my-1 px-1">
                                <p className="title">Title</p>
                                <h5>{details.title}</h5>
                            </div>

                            <div className="my-1 px-1 align-items-center">
                                <p className="title">description </p>
                                <h5>{details.description}</h5>
                            </div>
                            <div className="my-1 px-1">
                                <p className="title"> Data Add </p>
                                <h5>{formatDate(details.pub_date)}  </h5>
                            </div>
                            {details.category_id == 1 && <>

                                <div className=" my-1 px-1">
                                    <p className="title">
                                        Expiry Date
                                    </p>
                                    <h5>{formatDate(details.expiry_date)}</h5>
                                </div>
                                <div className="my-1 px-1">
                                    <p className="title">quantity</p>
                                    <h5>{details.quantity}</h5>
                                </div>
                                <div className="my-1 px-1">
                                    <p className="title">weight</p>
                                    <h5>{details.weight} Kg</h5>
                                </div>
                            </>}
                            <button className='btn-order' onClick={() => handelOrderDonation(details.serial)}> Order Now <i className="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}
