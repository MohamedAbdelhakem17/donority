import React, { useState } from 'react'

export default function UserNeed() {
    const [active, setActive] = useState()
    return (
        <>
            <section className='user-donation main-padding-top '>
                <div className="main-title">
                    <h2>Needs</h2>
                </div>
                <div className="container">
                    <div className="options">
                        <h6 className={`option ${active ? "active" : ""}`} onClick={() => setActive(true)}>Available</h6>
                        <h6 className={`option ${!active ? "active" : ""}`} onClick={() => setActive(false)} >Ordered</h6>
                    </div>
                </div>
            </section>
        </>
    )
}
