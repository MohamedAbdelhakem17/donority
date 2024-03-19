import React from 'react'

export default function Signin() {
    return (
        <>
            <section className='login'>
                <div className="main-title">
                    <h2>Log in</h2>
                </div>
                <div className="container">
                    <form className='auth-form mt-5'>
                        <div className="input-colaction">
                            <label htmlFor="userEmail">Email *</label>
                            <input type="email" name='userEmail' id='userEmail' />
                        </div>
                        <div className="input-colaction">
                            <label htmlFor="userPassword">Password*</label>
                            <input type="password" name='userPassword' id='userPassword' />
                        </div>
                        <input type="submit" className='btn' value={"Log in"} />
                    </form>
                </div>
            </section>
        </>
    )

}
