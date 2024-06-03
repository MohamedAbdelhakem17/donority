import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useContent from '../../utilities/ChangeLanguage'
import food from "./donationsType/food.jpg"
import clothes from "./donationsType/Clothes.jpg"
import furniture from "./donationsType/furniture.jpg"
import tool from "./donationsType/tools.jpg"
import axios from 'axios'
import useGetOneItem from '../../Context/ItemDetails/ItemDetailsContext'
import formatDate from '../../utilities/FormatData'
import getId from '../../utilities/HandelTYpe'
import useAuth from '../../Context/AuthContext/AuthContext'
import { Helmet } from "react-helmet";


export default function DonaiationType({ apiLink }) {
    const { type } = useParams()
    const { isloggedIn, userId } = useAuth()
    const donationId = getId(type)
    const imageSrc = donationId === 1 ? food : donationId === 2 ? clothes : donationId === 3 ? furniture : tool
    const content = useContent("donation")
    const navigateTo = useNavigate();
    const imageLink = "https://api.donority.site/images/"
    const [active, setActive] = useState(type)
    const [donation, setDonation] = useState([])
    const [loading, setLoding] = useState(true)
    const { showDetailes } = useGetOneItem()

    const handleOptionClick = (type) => {
        setActive(type);
        navigateTo(`/donation/${type}`);
    };

    const getDonation = useCallback(async (id) => {
        try {
            const apiUrl = `${apiLink}GetDonations?cat_id=${id}`
            const { data } = await axios(apiUrl)
            const { Code, data: dataRespons } = data
            if (Code === 200) {
                if (isloggedIn)
                    setDonation(dataRespons.filter((item) => item.active && item.user_id !== userId))
                else
                    setDonation(dataRespons.filter((item) => item.active))
            }
            else
                setDonation([])
            setLoding(false)
        } catch (error) {
            console.log(error)
        }
    }, [apiLink , isloggedIn , userId])


    const handelshowDetailes = (id, item) => {
        navigateTo(`/donation-details/${id}`)
        showDetailes(item)
    }

    useEffect(() => {
        getDonation(donationId)
    }, [donationId, getDonation, userId])


    return (
        <>
            <Helmet>
                <title>DONORITY Dnation -{type}</title>
            </Helmet>
            <section className='main-padding-top donaiation-type'>
                <div className="container py-2">

                    <ul className="options">
                        <li className={`option ${active === "food" && "active"}`} onClick={() =>
                            handleOptionClick("food")}>{content("food")}</li>
                        <li className={`option ${active === "clothes" && "active"}`} onClick={() =>
                            handleOptionClick("clothes")}>{content("clothes")}</li>
                        <li className={`option ${active === "tools" && "active"}`} onClick={() =>
                            handleOptionClick("tools")}>{content("tools")}</li>
                        <li className={`option ${active === "furniture" && "active"}`} onClick={() =>
                            handleOptionClick("furniture")}>{content("furniture")}</li>
                    </ul>

                    {donation.length > 0
                        ? <div className="row justify-content-center align-items-center">
                            {donation.map((item) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 p-2" key={item.serial}>
                                        <div className="inner ">
                                            <div className="image">
                                                <img src={item.image_path ? `${imageLink}${item.image_path} ` : imageSrc}
                                                    alt={item.title} className='' />
                                            </div>
                                            <div className="content p-2">
                                                <h5>{item.title}</h5>
                                                {
                                                    item.expiry_date && <h5 className='time'>{formatDate(item.pub_date)}</h5>
                                                }
                                                <span className="type">{type}</span>
                                                <span onClick={() => handelshowDetailes(item.serial, item)} className='link'><i className="fa-solid fa-arrow-right"></i> Show Details </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        : <div className="loading">
                            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <h4>There are no items to display
                            </h4>}
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

