import { useEffect, useState } from "react"
import { ItemDetails } from "./ItemDetailsContext"
import { json } from "react-router-dom"


const ItemDetailsProvider = ({ children }) => {
    const [details, setDetails] = useState(false)


    const showDetailes = (item) => {
        sessionStorage.setItem("item", JSON.stringify(item))
        setDetails(item)
    }

    useEffect(() => {
        const data = JSON.parse(sessionStorage.getItem("item"))
        if (sessionStorage.getItem("item") !== null)
            setDetails(data)
    }, [])

    return <ItemDetails.Provider value={{ showDetailes, details }}>
        {children}
    </ItemDetails.Provider>

}

export default ItemDetailsProvider 