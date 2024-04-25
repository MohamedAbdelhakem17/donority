import React from 'react'
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";


export default function Navbar() {
    const { changeLanguage } = useLocalization()

    return (
        <div>

            <h2>
                <button className='btn btn-danger mx-5' onClick={() => changeLanguage("ar")}>ar</button>
                <button className='btn btn-danger' onClick={() => changeLanguage("en")}>en</button>
            </h2>
        </div>
    )
}
