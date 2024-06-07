import React, { useCallback, useEffect, useState } from 'react'
import placholder from "./placholder.jpg"
import axios from 'axios'
import useAuth from "../../../Context/AuthContext/AuthContext"
import formatDate from "../../../utilities/FormatData"
import { getType } from '../../../utilities/HandelTYpe'
import useContent from '../../../utilities/ChangeLanguage'

export default function UserDonation({ apiLink }) {
    const [active, setActive] = useState(true)
    const { userId } = useAuth()
    const [donation, setDonation] = useState([])
    const content = useContent()
    const imageLink = "https://api.donority.site/images/"


    const getDonation = useCallback(async (id) => {
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
    }, [apiLink])

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

    /* const deleteDonation = async (id) => {
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
     }*/

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            getDonation(userId)
        }
    }, [userId, getDonation])

    const handelActiveDonation = () => {
        const dataToDisplay = donation.filter(((item) => item.active === active))
        setDonation(dataToDisplay)
    }


    return (
        <section className='user-donation main-padding-top '>
            <div className="main-title">
                <h2>Donation</h2>
            </div>
            <div className="container">
                <div className="options">
                    <h6 className={`option ${active && "active"}`} onClick={() => setActive(true)}>Available</h6>
                    <h6 className={`option ${!active && "active"}`} onClick={() => setActive(false)} >Ordered</h6>
                </div>

                {donation.length > 0
                    ? <div className="row justify-content-center align-items-center w-100"  >
                        {donation.filter((item) => item.active === active).map((item) => {
                            return (
                                <div className="col-12 col-md-6 col-lg-4  p-2" key={item.serial}>
                                    <div className="inner-ordered">
                                        <div className="image">
                                            <img src={item.image_path ? `${imageLink}${item.image_path} ` : placholder}
                                                alt={item.title} className='w-100' />
                                        </div>
                                        <div className="content p-2">
                                            <span className="type">{getType(item.category_id)}</span>
                                            <div className="label">Title </div>
                                            <h5>{item.title}</h5>
                                            <div className="label">Expir Date</div>
                                            <h5 className='title'>{formatDate(item.expiry_date)}</h5>
                                            {!item.active && <button className='main-btn' onClick={() => resetDonation(item.serial)}>Retreve <i className="fa-solid fa-repeat"></i></button>}
                                        </div>
                                    </div>
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



// import React, { useCallback, useEffect, useState } from 'react'
// import placholder from "./placholder.jpg"
// import axios from 'axios'
// import useAuth from "../../../Context/AuthContext/AuthContext"
// import formatDate from "../../../utilities/FormatData"
// import { getType } from '../../../utilities/HandelTYpe'
// import { useNavigate, useParams } from 'react-router-dom'

// export default function UserDonation({ apiLink }) {
//     const [active, setActive] = useState(true)
//     const [donation, setDonation] = useState([])
//     const navigateTo = useNavigate()
//     const { status } = useParams()
//     const { userId } = useAuth()
//     // const content = useContent("donation")
//     const imageLink = "https://api.donority.site/images/"


//     const getDonation = useCallback(async (id) => {
//         try {
//             const apiUrl = `${apiLink}GetDonationsUser?user_id=${id}`
//             const { data } = await axios(apiUrl)
//             const { Code, data: dataRespons } = data
//             if (Code === 200)
//                 setDonation(dataRespons)
//             else
//                 setDonation([])

//         } catch (error) {
//             console.log(error)
//         }
//     }, [apiLink])

//     const resetDonation = async (id) => {
//         try {
//             const apiUrl = `${apiLink}ResetDonation?ID=${id}`
//             const { data } = await axios(apiUrl)
//             const { Code } = data
//             if (Code === 200)
//                 getDonation(userId)
//             console.log(data.data)
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     /* const deleteDonation = async (id) => {
//          try {
//              const apiUrl = `${apiLink}DeletedDonation?ID=${id}`
//              const { data } = await axios.delete(apiUrl, {
//                  headers: {
//                      "Content-Type": "application/json; charset=utf-8"
//                  }
//              })
//              const { Code } = data
//              if (Code === 200)
//                  getDonation(userId)
//          } catch (error) {
//              console.log(error)
//          }
//      }*/

//     useEffect(() => {
//         if (localStorage.getItem("user") !== null) {
//             getDonation(userId)
//         }
//     }, [userId, getDonation])

//     const handelActiveDonation = (status, act) => {
//         const dataToDisplay = donation.filter(((item) => item.active === act))
//         setDonation(dataToDisplay)
//         navigateTo(`/user-donation/${status}`)
//     }


//     return (
//         <section className='user-donation main-padding-top '>
//             <div className="main-title">
//                 <h2>Donation</h2>
//             </div>
//             <div className="container">
//                 <div className="options">
//                     <h6 className={`option ${status === "available" && "active"}`} onClick={() => handelActiveDonation("available", true)}>Available</h6>
//                     <h6 className={`option ${status === "ordered" && "active"}`} onClick={() => handelActiveDonation("ordered", false)} >Ordered</h6>
//                 </div>

//                 {donation.length > 0
//                     ? <div className="row justify-content-center align-items-center w-100"  >
//                         {donation.filter((item) => item.active === active).map((item) => {
//                             return (
//                                 <div className="col-12 col-md-6 col-lg-4  p-2" key={item.serial}>
//                                     <div className="inner-ordered">
//                                         <div className="image">
//                                             <img src={item.image_path ? `${imageLink}${item.image_path} ` : placholder}
//                                                 alt={item.title} className='w-100' />
//                                         </div>
//                                         <div className="content p-2">
//                                             <span className="type">{getType(item.category_id)}</span>
//                                             <div className="label">Title </div>
//                                             <h5>{item.title}</h5>
//                                             <div className="label">Expir Date</div>
//                                             <h5 className='title'>{formatDate(item.expiry_date)}</h5>
//                                             {!item.active && <button className='main-btn' onClick={() => resetDonation(item.serial)}>Retreve <i className="fa-solid fa-repeat"></i></button>}
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         })}
//                     </div>
//                     : <div className="loading">
//                         <i className="fa-solid fa-spinner fa-spin"></i>
//                     </div>

//                 }
//             </div>
//         </section>
//     )
// }
