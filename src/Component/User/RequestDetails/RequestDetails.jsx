import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetRequestDetails from '../../../Context/RequestDetails/RequestDetailsContext';
import { useEffect } from 'react';
import formatDate from '../../../utilities/FormatData';

export default function RequestDetails() {
    const { id } = useParams()
    const imageLink = "https://api.donority.site/images/"
    const [itemData, setItemData] = useState()
    const { fullOrderData } = useGetRequestDetails();

    const showOneItem = (id) => {
        const singleItem = fullOrderData.find((item) => item.serial === +id)
        setItemData(singleItem)
    }

    useEffect(() => {
        showOneItem(id)
    }, [fullOrderData])
    return (
        <>
            <section className='main-padding-top request-details'>
                {itemData !== undefined ?
                    <div className="container-fluid px-5">
                        <div className="row pt-3">
                            <div className="col-md-5 col-12">
                                <img src={`${imageLink}${itemData.image_path}`} alt={itemData.title} />
                            </div>
                            <div className="col-md-7 col-12">
                                <div className="px-2 content">
                                    <h2>Donation information</h2>
                                    <div className="px-1">
                                        <p className="title">Title</p>
                                        <h5>{itemData.title}</h5>
                                    </div>

                                    <div className="px-1 align-items-center">
                                        <p className="title">description </p>
                                        <h5>{itemData.description}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title"> Data Add </p>
                                        <h5>{formatDate(itemData.pub_date)} </h5>
                                    </div>
                                    {itemData.category_id == 1 && <>

                                        <div className=" px-1">
                                            <p className="title">
                                                Expiry Date
                                            </p>
                                            <h5>{formatDate(itemData.expiry_date)}</h5>
                                        </div>
                                        <div className="px-1">
                                            <p className="title">quantity</p>
                                            <h5>{itemData.quantity}</h5>
                                        </div>
                                        <div className="px-1">
                                            <p className="title">weight</p>
                                            <h5>{itemData.weight} Kg</h5>
                                        </div>
                                    </>}

                                    <h2>Donor information</h2>
                                    <div className="px-1">
                                        <p className="title">Donor's name</p>
                                        <h5>{itemData.firstname} {itemData.lasrname}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Address</p>
                                        <h5>{itemData.address}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Phone</p>
                                        <h5>{itemData.mobile_number}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Email</p>
                                        <h5>{itemData.email}</h5>
                                    </div>

                                    <h2>Communication</h2>
                                    <div className="row contact">
                                        <div className="col-4">
                                            <a href={`mailto:${itemData.email}`}>Send Email <i className="fa-solid fa-envelope"></i> </a>
                                        </div>
                                        <div className="col-4">
                                            <a href={`tel:${itemData.mobile_number}`}>Call Me <i className="fa-solid fa-phone"></i></a>
                                        </div>
                                        <div className="col-4">
                                            <a href={`https://wa.me/20${itemData.mobile_number}`} rel="noopener" title="Chat with Me" target="_blank">Whatsapp<i
                                                className="fa-brands fa-whatsapp"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="loading">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>
                }
            </section>
        </>
    )
}
