import React from 'react'
import notFoundImg from "./404.png"
import "./notFound.css"
import { Link } from 'react-router-dom'
import useLocalization from '../../Context/LocalizationContext/LoclaesContext'
export default function NotFound() {
    const { t } = useLocalization()
    const content = (key) => t(`error_page.${key}`)
    return (
        <>
            <section className="error_page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 content">
                            <h3>{content("title")}</h3>
                            <h4>{content("subtitle")}</h4>
                            <p className='text-muted'>{content("message")}</p>
                        </div>
                        <div className="img col-12 col-lg-5">
                            <img src={notFoundImg} alt="NotFound" className='w-100' />
                        </div>
                        <div className="foot_content">
                            <h3>{content("footer_title")}</h3>
                            <ul className="links">
                                <li><Link to={"/"} className='link'>{content("links.home")}</Link></li>
                                <li><Link to={"/"} className='link'>{content("links.donations")}</Link></li>
                                <li><Link to={"/"} className='link'>{content("links.about")}</Link></li>
                                <li><Link to={"/"} className='link'>{content("links.contact_us")}</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
