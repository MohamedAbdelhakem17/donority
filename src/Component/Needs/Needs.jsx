import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useContent from "../../utilities/ChangeLanguage";
import useGetOneItem from "../../Context/ItemDetails/ItemDetailsContext";
import formatDate from "../../utilities/FormatData";
import axios from "axios";
import getId from "../../utilities/HandelTYpe";

export default function Needs({ apiLink }) {
    const { type } = useParams();
    const [active, setActive] = useState(type);
    const [donation, setDonation] = useState([]);
    const content = useContent("donation");
    const { showDetailes } = useGetOneItem();
    const navigateTo = useNavigate();
    let donationId = getId(type);

    const handleOptionClick = (type) => {
        setActive(type);
        navigateTo(`/needs/${type}`);
    };

    const getDonation = async (id) => {
        try {
            const apiUrl = `${apiLink}GetInneed?cat_id=${id}`;
            const { data } = await axios(apiUrl);
            const { Code, data: dataRespons } = data;
            if (Code === 200) setDonation(dataRespons);
            else setDonation([]);
        } catch (error) {
            console.log(error);
        }
    };

    const handelshowDetailes = (id, item) => {
        navigateTo(`/need-details/${id}`);
        showDetailes(item);
    };

    useEffect(() => {
        getDonation(donationId);
    }, [type]);

    return (
        <>
            <section className="main-padding-top donaiation-type">
                <div className="container py-2">
                    <ul className="options">
                        <li className={`option ${active === "food" && "active"}`} onClick={() => handleOptionClick("food")}
                        >
                            {content("food")}
                        </li>
                        <li className={`option ${active === "clothes" && "active"}`} onClick={() =>
                            handleOptionClick("clothes")}
                        >
                            {content("clothes")}
                        </li>
                        <li className={`option ${active === "tools" && "active"}`} onClick={() => handleOptionClick("tools")}
                        >
                            {content("tools")}
                        </li>
                        <li className={`option ${active === "furniture" && "active"}`} onClick={() =>
                            handleOptionClick("furniture")}
                        >
                            {content("furniture")}
                        </li>
                    </ul>
                    {donation.length > 0 ? (
                        <div className="row">
                            {donation
                                .filter((item) => item.active)
                                .map((item) => {
                                    return (
                                        <div className="col-12 col-md-6 col-lg-3 p-2" key={item.serial}>
                                            <div className="inner ">
                                                <div className="need-content ">
                                                    <span className="type">{type}</span>
                                                    <h5>{item.title}</h5>
                                                    <h6 className="time">
                                                        <span> {formatDate(item.expiry_date)}</span>
                                                        <span onClick={() =>
                                                            handelshowDetailes(item.serial, item)
                                                        }
                                                            className="link"
                                                        >
                                                            <i className="fa-solid fa-arrow-right px-2"></i>
                                                            Show Details
                                                        </span>
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    ) : (
                        <div className="loading">
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
