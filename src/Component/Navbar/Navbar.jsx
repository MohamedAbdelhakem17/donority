import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "./logo.png";
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../Context/AuthContext/AuthContext";
import useContent from "../../utilities/ChangeLanguage";

export default function Navbar() {
    const { isloggedIn, logout } = useAuth()
    const { changeLanguage } = useLocalization();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isNavbarActive, setIsNavbarActive] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true)
    const [isActive, setIsActive] = useState(false)
    const [lang, setLang] = useState("en")
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false)
    const content = useContent("navbar")
    const openNavbar = () => {
        setIsNavbarOpen(true);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };

    const changeNavbarBackground = () => {
        const offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsActive(offsetTop > 100)
        setIsNavbarActive(isActive && isHomePage);
    };

    useEffect(() => {
        const isHomePage = location.pathname === "/";
        setIsHomePage(isHomePage)
        window.addEventListener("scroll", changeNavbarBackground);
        if (localStorage.getItem("language") !== null) {
            setLang(localStorage.getItem("language"))
        }
        return () => {
            window.removeEventListener("scroll", changeNavbarBackground);
        };

    }, [location, isActive]);

    const handleChangeLanguage = (event) => {
        const languageSelect = event.target.value;
        setLang(languageSelect)
        changeLanguage(languageSelect)
        closeNavbar()
    }

    const handelLogout = () => {
        logout()
        setOpenMenu(!openMenu)
    }


    return (
        <nav id="navbar" className={`navbar ${isNavbarActive && isHomePage ? 'active' : !isHomePage ? "active" : ''}`}>
            <div className="container-fluid">
                <div className="brand">
                    <Link onClick={closeNavbar} to="/">
                        <img src={logo} alt="Donoirty Logo" />
                    </Link>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <span className="open mx-2" onClick={openNavbar}>
                        <i className="fa-solid fa-bars"></i>
                    </span>
                    <div className={`model-body ${isNavbarOpen ? 'fixed' : ''}`}>
                        <ul className={`menu ${isNavbarOpen ? 'show' : ''}`}>
                            <li className="close">
                                <i onClick={closeNavbar} className="fa-regular fa-circle-xmark"></i>
                            </li>
                            <li className="nav-item">
                                <Link onClick={closeNavbar} className="nav-link" id="index" to={"/"}>
                                    {content("home")}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={closeNavbar} className="nav-link" to={"/donaiton/food"}>
                                    {content("donations")}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={closeNavbar} className="nav-link" to={"/needs"}>
                                    {content("needs")}
                                </Link>
                            </li>
                            {
                                /* Hide When User Loggedd In  */
                                !isloggedIn && <div className="actions d-flex">
                                    <Link onClick={closeNavbar} to={"/signup"} className="nav-link active mx-2">
                                        {content("signup")}
                                    </Link>
                                    <Link onClick={closeNavbar} to={"/signin"} className="nav-link active mx-2">
                                        {content("signin")}
                                    </Link>
                                </div>
                            }
                            <select name="language" id="language" onChange={handleChangeLanguage} value={lang}>
                                <option value="en" >{content("language.en")}</option>
                                <option value="ar" >{content("language.ar")}</option>
                            </select>
                        </ul>
                    </div>

                    {
                        /* Show When User Loggedd In  */
                        isloggedIn &&
                        <div className="profile mx-3">
                            <div className="icon" onClick={() => setOpenMenu(!openMenu)}>
                                <i className="fa-regular fa-user"></i>
                            </div>
                            {
                                openMenu && <ul className="menu">
                                    <li className="menu-item">
                                        <Link className="menu-link" to={"/user-profile"} onClick={() => setOpenMenu(!openMenu)}>{content("userProfile")}</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link className="menu-link" to={"/add-donaiation"} onClick={() => setOpenMenu(!openMenu)}>{content("addDonation")}</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link className="menu-link" to={"/in-need"} onClick={() => setOpenMenu(!openMenu)}>{content("addNeeds")}</Link>
                                    </li>
                                    <li className="menu-item">
                                        <Link className="menu-link" to={"/user-request"} onClick={() => setOpenMenu(!openMenu)}>{content("showRequest")}</Link>
                                    </li>
                                    <li className="logout" onClick={handelLogout}>{content("logout")}</li>
                                </ul>
                            }
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}
