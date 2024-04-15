import React, { useEffect, useRef } from 'react'
import Typed from 'typed.js';
import useLocalization from '../../../../Context/LocalizationContext/LoclaesContext';

export default function Hero() {
  const el = useRef(null);
  const { t, language } = useLocalization()
  const content = (key) => t(`signup.${key}`)

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
            <h2 className='slogen'>Charity Is Priority</h2>
            <h3>Giving Help To Those<br />Who Neer It.</h3>
            <p className='h3'>You can Donate  <span ref={el} /></p>
          </div>
          <div className="button" data-aos="fade-left" data-aos-duration="500" >
            <a href="#">Donate Now </a>
          </div>
        </div>
      </section>
    </>
  )
}
