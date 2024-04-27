import React from 'react'
import phoneImage from "./phone.png"
import "./downloade-app.css"
import android from "./android.svg"
import useContent from '../../../../utilities/ChangeLanguage'

export default function DownlodeApp() {
    const content = useContent("downloed_app")
    return (
        <>
            <section className="download-app bg-light py-3">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6 col-md-7 text-center content " data-aos="zoom-in" data-aos-duration="500"  >
                            <h4>{content("download")}</h4>
                            <h6>{content("title")} <br /><span>{content("description")}</span></h6>
                            <p className='text-muted '>
                                {content("install_text.headline")} <br />
                                {content("install_text.subheadline")} <br />
                                {content("install_text.call_to_action")}<br />
                                {content("install_text.footer")}
                            </p>

                            <a className="button" href={phoneImage} download>
                                <img src={android} alt="android Icon" />
                                <p>{content("button.title")} <br /> <span>{content("button.phone_type")}</span></p>
                            </a>
                        </div>
                        <div className="col-lg-5 col-md-4 d-none d-md-block text-center" data-aos="zoom-in" data-aos-duration="500" >
                            <img src={phoneImage} alt="Downlode App" className='w-75' />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
