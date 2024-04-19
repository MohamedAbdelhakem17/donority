import React from 'react'
import notFoundImg from "./404.png"
import "./notFound.css"
import { Link } from 'react-router-dom'
export default function NotFound() {
    return (
        <>
            <section className="error_page">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6 content">
                            <h3>Ooops!</h3>
                            <h4>We can't find the page</h4>
                            <p className='text-muted'>The page you're looking for might have been removed or is temporary unavailable</p>
                        </div>
                        <div className="img col-12 col-lg-5">
                            <img src={notFoundImg} alt="NotFound" className='w-100' />
                        </div>
                        <div className="foot_content">
                            <h3>Please check your URL or go to.....</h3>
                            <ul className="links">
                                <li><Link to={"/"} className='link'>Home</Link></li>
                                <li><Link to={"/"} className='link'>Donations</Link></li>
                                <li><Link to={"/"} className='link'>About</Link></li>
                                <li><Link to={"/"} className='link'>Contact us</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
