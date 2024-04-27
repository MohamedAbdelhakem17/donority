import React, { useState, useEffect } from "react";
import "./navbar.css";
import logo from "./logo.png";
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { changeLanguage } = useLocalization();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isNavbarActive, setIsNavbarActive] = useState(false);

    const openNavbar = () => {
        setIsNavbarOpen(true);
    };

    const closeNavbar = () => {
        setIsNavbarOpen(false);
    };

    const changeNavbarBackground = () => {
        const offsetTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsNavbarActive(offsetTop > 100);
    };

    useEffect(() => {
        window.addEventListener("scroll", changeNavbarBackground);
        return () => {
            window.removeEventListener("scroll", changeNavbarBackground);
        };
    }, []);

    return (
        <nav id="navbar" className={`navbar ${isNavbarActive ? 'active' : ''}`}>
            <div className="container-fluid">
                <div className="brand">
                    <Link to="/">
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
                            <Link className="nav-link" id="index" to={"/"}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/donaitontype/food"}>
                                Donation
                            </Link>
                        </li>
                        <div className="actions d-flex">
                            <Link to={"/signup"} className="nav-link active mx-2">
                                Signup
                            </Link>
                            <Link to={"/signin"} className="nav-link active mx-2">
                                Signin
                            </Link>
                        </div>
                        <div className="language">
                            <button className="btn btn-danger mx-5" onClick={() => changeLanguage("ar")}>
                                ar
                            </button>
                            <button className="btn btn-danger" onClick={() => changeLanguage("en")}>
                                en
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
