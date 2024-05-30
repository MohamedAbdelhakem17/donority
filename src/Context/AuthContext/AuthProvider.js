import { useState, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { Navigate } from "react-router-dom";


const AuthProvider = ({ children }) => {
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [userId, setUserId] = useState("")
    const [userLoggedInData, setUserLoggedInData] = useState(null)

    const saveUserData = () => {
        const data = localStorage.getItem("user")
        const user = JSON.parse(data)
        const userId = user[0].id
        setUserId(userId)
        setUserLoggedInData(user)
        setIsLoggedIn(true)
    }

    const logout = () => {
        localStorage.removeItem("user")
        setUserLoggedInData(null)
        setIsLoggedIn(false)
        setUserId("")
        return <Navigate to="/" />
    }

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            saveUserData();
        }
    }, [userId])

    return <AuthContext.Provider value={{ isloggedIn, setIsLoggedIn, logout, saveUserData, userLoggedInData, userId }}>
        {children}
    </AuthContext.Provider>

}

export default AuthProvider 