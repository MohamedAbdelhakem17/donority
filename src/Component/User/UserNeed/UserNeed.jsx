import React, { useEffect, useState } from 'react'
import useAuth from '../../../Context/AuthContext/AuthContext'
import axios from 'axios'
import { getType } from '../../../utilities/HandelTYpe'
import formatDate from '../../../utilities/FormatData'
import useContent from '../../../utilities/ChangeLanguage'

export default function UserNeed({ apiLink }) {
    const [active, setActive] = useState(true)
    const [userNeeds, setUserNeeds] = useState([])
    const { userId } = useAuth()
    const content = useContent()

    const getUserNeeds = async () => {
        try {
            const apiUrl = `${apiLink}GetInneedUser?user_id=${userId}`
            const { data } = await axios.get(apiUrl)
            if (data.Code === 200) {
                setUserNeeds(data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const resetNeeds = async (id) => {
        try {
            const apiUrl = `${apiLink}ResetInneed?ID=${id}`
            const { data } = await axios(apiUrl)
            const { Code } = data
            if (Code === 200)
                getUserNeeds(userId)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getUserNeeds() }, [])
    return (
        <>
            <section className='user-donation main-padding-top '>
                <div className="main-title">
                    <h2>Needs</h2>
                </div>
                <div className="container">
                    <div className="options">
                        <h6 className={`option ${active ? "active" : ""}`} onClick={() => setActive(true)}>Available</h6>
                        <h6 className={`option ${!active ? "active" : ""}`} onClick={() => setActive(false)} >Ordered</h6>
                    </div>
                    <div className="row w-100 g-3 justify-content-center">
                        {userNeeds.filter(item => item.active === active).map(item =>
                            <div className="col-12 col-md-6 col-lg-4" key={item.serial}>
                                <div className="inner-ordered">
                                    <div className="content p-2">
                                        <span className="type">{getType(item.category_id)}</span>
                                        <div className="label">Title </div>
                                        <h5>{item.title}</h5>
                                        <div className="label">Create Date</div>
                                        <h5 className='title'>{formatDate(item.pub_date)}</h5>
                                        {!item.active && <button className='main-btn' onClick={() => resetNeeds(item.serial)}>Retreve <i className="fa-solid fa-repeat"></i></button>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

