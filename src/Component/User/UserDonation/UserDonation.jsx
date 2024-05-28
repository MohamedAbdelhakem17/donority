import "./user-donation.css"
import React, { useEffect, useState } from 'react'
// import useContent from '../../utilities/ChangeLanguage'
// import placholder from "./placholder.jpg"
import axios from 'axios'
import useAuth from "../../../Context/AuthContext/AuthContext"
import formatDate from "../../../utilities/FormatData"
export default function UserDonation({ apiLink }) {
    const [active, setActive] = useState(true)
    const { userId } = useAuth()
    const [donation, setDonation] = useState([])
    // const content = useContent("donation")
    const imageLink = "https://api.donority.site/images/"
    let imageSrc, placholder


    const getDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}GetDonationsUser?user_id=${id}`
            const { data } = await axios(apiUrl)
            const { Code, data: dataRespons } = data
            if (Code === 200)
                setDonation(dataRespons)
            else
                setDonation([])

        } catch (error) {
            console.log(error)
        }
    }

    const resetDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}ResetDonation?ID=${id}`
            const { data } = await axios(apiUrl)
            const { Code } = data
            if (Code === 200)
                getDonation(userId)

            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }
    const deleteDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}DeletedDonation?ID=${id}`
            const { data } = await axios.delete(apiUrl, {
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            const { Code } = data
            if (Code === 200)
                getDonation(userId)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            getDonation(userId)
        }
    }, [])

    return (
        <section className='user-donation main-padding-top '>
            <div className="main-title">
                <h2>Donation</h2>
            </div>
            <div className="container">
                <div className="options">
                    <h6 className={`option ${active ? "active" : ""}`} onClick={() => setActive(true)}>Available</h6>
                    <h6 className={`option ${!active ? "active" : ""}`} onClick={() => setActive(false)} >Ordered</h6>
                </div>

                {donation.length > 0
                    ? <div className="row justify-content-center align-items-center">
                        {donation.filter((item) => item.active === active).map((item) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4 p-2" key={item.serial}>
                                    {active ?
                                        <div className="inner-available">
                                            <div className="image w-100">
                                                <img src={item.image_path ? `${imageLink}${item.image_path} ` : placholder} alt={item.title} className='w-100' />
                                            </div>
                                            <div className="content p-2">
                                                <h5>{item.title}</h5>
                                                <p>{item.description}</p>
                                                <h6 className='time'>
                                                    {formatDate(item.pub_date)}
                                                </h6>
                                                <h2 onClick={() => deleteDonation(item.serial)}><i className="fa-solid fa-delete-left"></i></h2>
                                            </div>
                                        </div>

                                        : <div className="inner-ordered">
                                            <div className="image">
                                                <img src={item.image_path ? `${imageLink}${item.image_path} ` : imageSrc}
                                                    alt={item.title} className='' />
                                            </div>
                                            <div className="content p-2">
                                                <h5>{item.title}</h5>
                                                <h5 className='time'>{formatDate(item.expiry_date)}</h5>
                                                {/* <span className="type">{type}</span> */}
                                                <span className='link'><i className="fa-solid fa-arrow-right"></i> Show Details </span>
                                            </div>
                                        </div>}
                                </div>
                            )
                        })}
                    </div>
                    : <div className="loading">
                        <i className="fa-solid fa-spinner fa-spin"></i>
                    </div>

                }
            </div>
        </section>
    )
}
