import { useState } from "react"
import { ItemDetails } from "./ItemDetailsContext"


const ItemDetailsProvider = ({ children }) => {
    const [details, setDetails] = useState(false)


    const showDetailes = (item) => {
        setDetails(item)
        console.log(item)
    }


    return <ItemDetails.Provider value={{ showDetailes, details }}>
        {children}
    </ItemDetails.Provider>

}

export default ItemDetailsProvider 