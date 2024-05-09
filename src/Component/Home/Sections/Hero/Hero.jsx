import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js';
import { Link } from "react-router-dom";
import useContent from '../../../../utilities/ChangeLanguage';
import useLocalization from '../../../../Context/LocalizationContext/LoclaesContext';
import useAuth from '../../../../Context/AuthContext/AuthContext';


export default function Hero() {
  const el = useRef(null);
  const { isloggedIn } = useAuth()
  const content = useContent("hero")
  const { language } = useLocalization()
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [content("donations_type.food"), content("donations_type.clothes"), content("donations_type.tools"), content("donations_type.furniture")],
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
            <h2 className='slogen'>{content("slogan")}</h2>
            <h3>{content("description.first")}<br />{content("description.last")}</h3>
            <p className='h3'>{content("donations")} <br className='d-md-none d-block' /> <span ref={el} /></p>
          </div>
          <div className="button" data-aos="fade-left" data-aos-duration="500" >
            <Link to={isloggedIn ? "/add-donaiation" : "/signin"}>{content("donate_now")} </Link>
            <Link to={"/needs/food"}>{content("isNeed")} </Link>
          </div>
        </div>
      </section>
    </>
  )
}
