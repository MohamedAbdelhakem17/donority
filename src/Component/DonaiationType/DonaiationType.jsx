import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "./donaiationType.css"
import useContent from '../../utilities/ChangeLanguage'

export default function DonaiationType() {
    const { type } = useParams()
    const [active, setActive] = useState(type)
    const content = useContent("donation")
    const navigate = useNavigate();


    const handleOptionClick = (type) => {
        setActive(type);
        navigate(`/donaiton/${type}`);
    };

    return (
        <>
            <section className='main-padding-top donaiation-type' >
                <div className="container py-2">
                    <ul className="options d-flex justify-content-center align-items-center gap-5 mt-3">
                        <li className={`option ${active === "food" && "active"}`} onClick={() => handleOptionClick("food")}>{content("food")}</li>
                        <li className={`option ${active === "clothes" && "active"}`} onClick={() => handleOptionClick("clothes")}>{content("clothes")}</li>
                        <li className={`option ${active === "tools" && "active"}`} onClick={() => handleOptionClick("tools")}>{content("tools")}</li>
                        <li className={`option ${active === "furniture" && "active"}`} onClick={() => handleOptionClick("furniture")}>{content("furniture")}</li>
                    </ul>
                </div>
            </section>
        </>
    )
}
