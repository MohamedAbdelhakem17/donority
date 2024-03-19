import React from 'react'
import "../Static/authentication.css"

export default function Signup() {
    return (
        <>
            <section className='signup'>
                <div className="main-title">
                    <h2>Register</h2>
                </div>
                <div className="container">
                    <form className='auth-form'>
                        <div className="input-colaction">
                            <label htmlFor="firstName">First Name *</label>
                            <input type="text" name='firstName' id='firstName' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="lastName">Last Name *</label>
                            <input type="text" name='lastName' id='lastName' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">Email *</label>
                            <input type="email" name='userEmail' id='userEmail' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">Password*</label>
                            <input type="password" name='userPassword' id='userPassword' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="confirmPassword">Confirm Password *</label>
                            <input type="password" name='confirmPassword' id='confirmPassword' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPhone">Phone Number *</label>
                            <input type="text" name='userPhone' id='userPhone' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userAddress">Address</label>
                            <input type="text" name='userAddress' id='userAddress' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="quation">What is Your Mother's Name ? *</label>
                            <input type="text" name='quation' id='quation' />
                        </div>
                        <input type="submit" className='btn' value={"Register"} />
                    </form>
                </div>
            </section>
        </>
    )
}
