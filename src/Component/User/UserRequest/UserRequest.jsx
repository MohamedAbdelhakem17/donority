import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useGetRequestDetails from '../../../Context/RequestDetails/RequestDetailsContext'
import formatDate from '../../../utilities/FormatData'

export default function UserRequest() {
  const navigateTo = useNavigate()
  const { type } = useParams()
  const [active, setActive] = useState(type)
  const { fullDonationData, fullNeedData } = useGetRequestDetails();
  // const [loading, setLoding] = useState(true)
  const handleOptionClick = (type) => {
    setActive(type);
    navigateTo(`/user-request/${type}`);
    // setLoding(false);
  };

  const showNeedsDetails = (id) => {
    navigateTo(`/user-request/details/${id}`)
  }

  const showDonationDetails = (id) => {
    navigateTo(`/user-request/details/${id}`)
  }

  console.log(fullDonationData , "fullDonationData")
  console.log(fullNeedData , "fullNeedData")

  return (
    <section className='user-request main-padding-top '>
      <div className="main-title">
        <h2>Show Request</h2>
      </div>
      <div className="container">
        <div className="options">
          <h6 className={`option ${active === "donation" ? "active" : ""}`} onClick={() => handleOptionClick("donation")}>Donations</h6>
          <h6 className={`option ${active === "needs" ? "active" : ""}`} onClick={() => handleOptionClick("needs")} >Needs</h6>
        </div>
        <div className="row py-2 w-100 justify-content-center align-items-center gy-4">

          {/* Donation */}
          {active === "donation" && <>
            {
              fullDonationData.length > 0 ?
                fullDonationData.map(item => <div className="col-12 col-md-6 col-lg-4" key={item?.serial}>
                  <div className="inner-needs" >
                    <h6 className='label'>Need Titel</h6>
                    <p className='title'>{item?.title}</p>
                    <h6 className='label'>The needy</h6>
                    <p className='title'>{`${item?.firstname} ${item?.lasrname}`}</p>
                    <h6 className='label'>Need date</h6>
                    <p className='title'>{formatDate(item?.pub_date)}</p>
                    <button className='btn' onClick={() => showDonationDetails(item?.serial)}> Show Details <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>)
                : (
                  <div className="loading">
                    {
                      <h4>There are no items to display</h4>
                    }
                  </div>
                )
            }
          </>}

          {/* Needs */}
          {active === "needs" && <>
            {
              fullNeedData.length > 0 ?
                fullNeedData.map(item => <div className="col-12 col-md-6 col-lg-4" key={item?.serial}>
                  <div className="inner-needs" >
                    <h6 className='label'>Donation Titel</h6>
                    <p className='title'>{item?.title}</p>
                    <h6 className='label'>Donor's name</h6>
                    <p className='title'>{`${item?.firstname} ${item?.lasrname}`}</p>
                    <h6 className='label'>Donation date</h6>
                    <p className='title'>{formatDate(item?.pub_date)}</p>
                    <button className='btn' onClick={() => showNeedsDetails(item?.serial)}> Show Details <i className="fa-solid fa-arrow-right"></i></button>
                  </div>
                </div>)
                : (
                  <div className="loading">
                    
                      <h4>There are no items to display</h4>

                    
                  </div>
                )
            }

          </>}

        </div>
      </div>
    </section>)
}
