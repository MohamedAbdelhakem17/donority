import React, { useEffect, useState } from 'react'
import toolImg from "./donationsType/tools.jpg"
import foodImg from "./donationsType/food.jpg"
import furnitureImg from "./donationsType/furniture.jpg"
import clothesImg from "./donationsType/Clothes.jpg"
import { Link } from 'react-router-dom'
import useContent from '../../../../utilities/ChangeLanguage'
export default function Donations() {
  const content = useContent("donation")
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
      type: content("tools"),
      img: toolImg
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
                <Link to={`/donaiton/${type.toLowerCase()}`}>
                  <div className="inner rounded rondeed-2 bg-danger ">
                    <img src={img} alt={type} />
                    <h2>{type}</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
