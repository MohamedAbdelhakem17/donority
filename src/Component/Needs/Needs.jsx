import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContent from "../../utilities/ChangeLanguage";
import useGetOneItem from "../../Context/ItemDetails/ItemDetailsContext";
import formatDate from "../../utilities/FormatData";
import axios from "axios";
import getId from "../../utilities/HandelTYpe";
import useAuth from "../../Context/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

export default function Needs({ apiLink }) {
  const { type } = useParams();
  const [active, setActive] = useState(type);
  const [donation, setDonation] = useState([]);
  const content = useContent("donation");
  const [loading, setLoding] = useState(true);
  const { showDetailes } = useGetOneItem();
  const navigateTo = useNavigate();
  let donationId = getId(type);
  const { isloggedIn, userId } = useAuth();

  const handleOptionClick = (type) => {
    setActive(type);
    navigateTo(`/needs/${type}`);
  };

  const handelshowDetailes = (id, item) => {
    navigateTo(`/need-details/${id}`);
    showDetailes(item);
  };

  const getDonation = useCallback(
    async (id, user_id) => {
      try {
        const apiUrl = `${apiLink}GetInneed?cat_id=${id}`;
        const { data } = await axios(apiUrl);
        const { Code, data: dataRespons } = data;
        if (Code === 200)
          if (isloggedIn)
            setDonation(
              dataRespons.filter(
                (item) => item.active && item.user_id !== user_id
              )
            );
          else setDonation(dataRespons.filter((item) => item.active));
        else setDonation([]);
        setLoding(false);
      } catch (error) {
        console.log(error);
      }
    },
    [isloggedIn, apiLink , donationId]
  );

  useEffect(() => {
    getDonation(donationId, userId);
  }, [userId, donationId ]);

  return (
    <>
      <Helmet>
        <title>Donority Need - {type}</title>
      </Helmet>
      <section className="main-padding-top donaiation-type">
        <div className="container py-2">
          <ul className="options">
            <li
              className={`option ${active === "food" && "active"}`}
              onClick={() => handleOptionClick("food")}
            >
              {content("food")}
            </li>
            <li
              className={`option ${active === "clothes" && "active"}`}
              onClick={() => handleOptionClick("clothes")}
            >
              {content("clothes")}
            </li>
            <li
              className={`option ${active === "tools" && "active"}`}
              onClick={() => handleOptionClick("tools")}
            >
              {content("tools")}
            </li>
            <li
              className={`option ${active === "furniture" && "active"}`}
              onClick={() => handleOptionClick("furniture")}
            >
              {content("furniture")}
            </li>
          </ul>
          {donation.length > 0 ? (
            <div className="row justify-content-center">
              {donation
                .filter((item) => item.active)
                .map((item) => {
                  return (
                    <div
                      className="col-12 col-md-6 col-lg-3 p-2"
                      key={item.serial}
                    >
                      <div className="inner h-100" data-aos="fade-out" data-aos-duration="500">
                        <div className="need-content h-100 d-flex flex-column justify-content-between" >
                          <span className="type">{type}</span>
                          <h5>{item.title}</h5>
                          <h6 className="time">
                            <span> {formatDate(item.pub_date)}</span>
                            <span
                              onClick={() =>
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
              {loading ? (
                <i className="fa-solid fa-spinner fa-spin"></i>
              ) : (
                <h4>There are no items to display</h4>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
