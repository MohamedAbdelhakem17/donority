import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom";


const AuthProvider = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")
    const [userLoggedInData, setUserLoggedInData] = useState(null)

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            const userId = JSON.parse(localStorage.getItem("user"))[0].id
            setUserId(userId)
            saveUserData();
        }
    }, [])

    const saveUserData = () => {
        let data = localStorage.getItem("user")
        let user = JSON.parse(data)
        setUserLoggedInData(user)
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUserLoggedInData(null)
        setIsLoggedIn(false)
        return <Navigate to="/" />
    }

    return <AuthContext.Provider value={{ isloggedIn, setIsLoggedIn, logout, saveUserData, userLoggedInData  , userId}}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider 