import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moneyImg from "./donationsType/money.jpg"
import foodImg from "./donationsType/food.jpg"
import furnitureImg from "./donationsType/furniture.jpg"
import clothesImg from "./donationsType/Clothes.jpg"
export default function Donations({ apiLink }) {
  const [donations, setDonations] = useState([])
  const donationsImges = [foodImg, clothesImg, moneyImg, furnitureImg]
  const AlldataForDonationstype = donations.map((donationType, index) => {
    return { type: donationType.type, img: donationsImges[index] }
  })

  const getDonationsType = async () => {
    try {
      const ApiUrl = `${apiLink}/donationstypes`
      const { data } = await axios.get(ApiUrl)
      setDonations(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getDonationsType()
  }, [])

  return (
    <>
      <section className={"donations-type py-5"}>
        <div className="container">
          <h2 className='title mb-3' data-aos="zoom-in" data-aos-duration="500" data-aos-offset="200">Donation</h2>
          <div className="row">
            {AlldataForDonationstype.map(({ type, img }, index) => (
              <div className={"col-12 col-lg-3 col-md-6 p-3"} key={index} data-aos="fade-up" data-aos-duration="500" data-aos-delay="300" data-aos-offset="150">
                <div className="inner rounded rondeed-2 bg-danger ">
                  <img src={img} alt={type} />
                  <h2>{type}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
