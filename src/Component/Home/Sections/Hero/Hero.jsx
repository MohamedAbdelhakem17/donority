import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js';
import useLocalization from '../../../../Context/LocalizationContext/LoclaesContext';
import { Link } from "react-router-dom";


export default function Hero() {
  const el = useRef(null);
  const { t, language } = useLocalization()
  const content = (key) => t(`hero.${key}`)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Food ", "Clothes ", "Money ", "Furniture "],
      typeSpeed: 150,
      loop: true
    });
    return () => {
      typed.destroy()
    }
  }, [language])
  return (
    <>
      <section className='hero'>
        <div className="container">
          <div className="content" data-aos="fade-right" data-aos-duration="500" >
            <Link className='btn btn-dark m-2' to="/signin">signin</Link>
            <Link className='btn btn-dark m-2' to="/signup">signup</Link>
            <Link className='btn btn-dark m-2' to="/reset-password">password</Link>
            <h2 className='slogen'>{content("slogan")}</h2>
            <h3>{content("description.first")}<br />{content("description.last")}</h3>
            <p className='h3'>You can Donate  <span ref={el} /></p>
          </div>
          <div className="button" data-aos="fade-left" data-aos-duration="500" >
            <a href="#">{content("donate_now")} </a>
          </div>
        </div>
      </section>
    </>
  )
}
