import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetRequestDetails from '../../../Context/RequestDetails/RequestDetailsContext';
import { useEffect } from 'react';
import formatDate from '../../../utilities/FormatData';
import useContent from '../../../utilities/ChangeLanguage';

export default function RequestDetails() {
    const { id } = useParams()
    const content = useContent()
    const imageLink = "https://api.donority.site/images/"
    const [itemData, setItemData] = useState()
    const { fullDonationData } = useGetRequestDetails();

    const showOneItem = (id) => {
        const singleItem = fullDonationData.find((item) => item.serial === +id)
        setItemData(singleItem)
    }


    useEffect(() => {
        showOneItem(id)
    }, [fullDonationData])
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
                                        <h5 className='label'>{itemData.title}</h5>
                                    </div>

                                    <div className="px-1 align-items-center">
                                        <p className="title">description </p>
                                        <h5 className='label'>{itemData.description}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title"> Data Add </p>
                                        <h5>{formatDate(itemData.pub_date)} </h5>
                                    </div>
                                    {itemData.category_id == 1 && <>

                                        {itemData.expiry_date && <div className=" px-1">
                                            <p className="title">
                                                Expiry Date
                                            </p>
                                            <h5>{formatDate(itemData.expiry_date)}</h5>
                                        </div>}
                                        <div className="px-1">
                                            <p className="title">quantity</p>
                                            <h5 className='label'>{itemData.quantity}</h5>
                                        </div>
                                        <div className="px-1">
                                            <p className="title">weight</p>
                                            <h5 className='label'>{itemData.weight} Kg</h5>
                                        </div>
                                    </>}

                                    <h2>The needy information</h2>
                                    <div className="px-1">
                                        <p className="title">Donor's name</p>
                                        <h5 className='label'>{itemData.firstname} {itemData.lasrname}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Address</p>
                                        <h5 className='label'>{itemData.adress}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Phone</p>
                                        <h5 className='label'>{itemData.phonenumber}</h5>
                                    </div>
                                    <div className="px-1">
                                        <p className="title">Email</p>
                                        <h5 className='label'>{itemData.email}</h5>
                                    </div>
                                    <h2>Communication</h2>
                                    <div className="row contact g-2">
                                        <div className="col-md-4 col-6">
                                            <a href={`mailto:${itemData.email}`}>Send Email <i className="fa-solid fa-envelope"></i> </a>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <a href={`tel:${itemData.phonenumber}`}>Call Me <i className="fa-solid fa-phone"></i></a>
                                        </div>
                                        <div className="col-md-4 col-6">
                                            <a href={`https://wa.me/20${itemData.phonenumber}`} rel="noopener" title="Chat with Me" target="_blank">Whatsapp<i
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
