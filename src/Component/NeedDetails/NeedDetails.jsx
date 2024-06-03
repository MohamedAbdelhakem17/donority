import React from 'react'
import useGetOneItem from '../../Context/ItemDetails/ItemDetailsContext'
import { getType } from '../../utilities/HandelTYpe'
import formatDate from '../../utilities/FormatData'
import Swal from 'sweetalert2'
import useAuth from '../../Context/AuthContext/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function NeedDetails({ apiLink }) {
    const { details } = useGetOneItem()
    const { id } = useParams()
    const { isloggedIn, userId } = useAuth()
    const navigatTo = useNavigate()

    const orderNeed = async () => {
        try {
            const apiUrl = `${apiLink}ReserveInneed?ID=${id}`;
            const { data } = await axios(apiUrl);
            const { Code, Message, data: responseData } = data;
            if (Code === 200) {
                const fullData = { ...responseData.OwnerDetails, ...details, userOrderd: userId }
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
                    navigatTo("/user-request/donation")
                }, 1000)
            }
        } catch (error) {
            console.error(error);
        }
    }

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

    const handelOrderNeed = (id) => {
        isloggedIn ? orderNeed(id) : goToLogin(id)
    }

    return (
        <>
            <Helmet>
                <title>Donority Need - Details</title>
            </Helmet>
            <section className='need-detailes main-padding-top'>
                <div className="main-title">
                    <h2>Need Details</h2>
                </div>
                <div className="container">
                    <div className="row w-100">
                        <div className="col-md-9 col-12 mx-auto">
                            <div className="inner main-form w-100">
                                <div className="collection">
                                    <h3 className="title">Need Title</h3>
                                    <p className="label">{details.title}</p>
                                </div>
                                <div className="collection">
                                    <h3 className="title">Need Description</h3>
                                    <p className="label">{details.description}</p>
                                </div>
                                <div className="collection">
                                    <h3 className="title">Need Date</h3>
                                    <p className="label">{formatDate(details.pub_date)}</p>
                                </div>
                                {
                                    details.category_id === 1 && <>
                                        <div className="collection">
                                            <h3 className="title">Quantity</h3>
                                            <p className="label">{details.quantity}</p>
                                        </div>
                                        <div className="collection">
                                            <h3 className="title">Weight</h3>
                                            <p className="label">{details.weight} Kg</p>
                                        </div>
                                    </>
                                }
                                <span className="type py-2 px-5 mt-2 d-inline-block">{getType(details.category_id)}</span>
                            </div>
                            <button className="main-btn" onClick={() => handelOrderNeed(details.serial)}>Donate Now <i className="fa-solid fa-hand-holding-hand mx-2"></i></button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
