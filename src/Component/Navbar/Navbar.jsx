import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "./logo.png";
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const { changeLanguage } = useLocalization();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isNavbarActive, setIsNavbarActive] = useState(false);
    const [isHomePage, setIsHomePage] = useState(true)
    const [isActive, setIsActive] = useState(false)
    const location = useLocation();

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
        return () => {
            window.removeEventListener("scroll", changeNavbarBackground);
        };

    }, [location, isActive]);

    const handleChangeLanguage = (event) => {
        const languageSelect = event.target.value;
        changeLanguage(languageSelect)
    }



    return (
        <nav id="navbar" className={`navbar ${isNavbarActive && isHomePage ? 'active' : !isHomePage ? "active" :''}`}>
            <div className="container-fluid">
                <div className="brand">
                    <Link onClick={closeNavbar} to="/">
                        <img src={logo} alt="Donoirty Logo" />
                    </Link>
                </div>
                <span className="open" onClick={openNavbar}>
                    <i className="fa-solid fa-bars"></i>
                </span>
                <div className={`model-body ${isNavbarOpen ? 'fixed' : ''}`}>
                    <ul className={`menu ${isNavbarOpen ? 'show' : ''}`}>
                        <li className="close">
                            <i onClick={closeNavbar} className="fa-regular fa-circle-xmark"></i>
                        </li>
                        <li className="nav-item">
                            <Link onClick={closeNavbar} className="nav-link" id="index" to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={closeNavbar} className="nav-link" to={"/donaitontype/food"}>
                                Donation
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link onClick={closeNavbar} className="nav-link" to={"/needs"}>
                                Needs
                            </Link>
                        </li>
                        <div className="actions d-flex">
                            <Link onClick={closeNavbar} to={"/signup"} className="nav-link active mx-2">
                                Signup
                            </Link>
                            <Link onClick={closeNavbar} to={"/signin"} className="nav-link active mx-2">
                                Signin
                            </Link>
                        </div>
                        <select name="language" id="language" onChange={handleChangeLanguage}>
                            <option value="en">En</option>
                            <option value="ar">Ar</option>
                        </select>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
