import React, { useEffect, useState } from 'react'
import moneyImg from "./donationsType/money.jpg"
import foodImg from "./donationsType/food.jpg"
import furnitureImg from "./donationsType/furniture.jpg"
import clothesImg from "./donationsType/Clothes.jpg"
import useLocalization from '../../../../Context/LocalizationContext/LoclaesContext'
export default function Donations() {
  const { t } = useLocalization()
  const content=(key)=> t(`donation.${key}`)
  const donations = [
    {
      id: "1",
      type: content("food"),
      img: foodImg
    },
    {
      id: "2",
      type: content("clothes"),
      img: clothesImg
    },
    {
      id: "3",
      type: content("money"),
      img: moneyImg
    },
    {
      id: "4",
      type: content("furniture"),
      img: furnitureImg
    }
  ]

  return (
    <>
      <section className={"donations-type py-5"}>
        <div className="container">
          <h2 className='title mb-3' data-aos="zoom-in" data-aos-duration="500" data-aos-offset="200">{content("title")}</h2>
          <div className="row">
            {donations.map(({ type, img }, index) => (
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
