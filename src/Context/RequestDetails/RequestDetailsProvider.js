import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequestContext } from "./RequestDetailsContext";
import useAuth from "../AuthContext/AuthContext";

export const RequestDetailsProvider = ({ children }) => {
    const [donations, setDonations] = useState([]);
    const [donationOrderData, setDonationOredrData] = useState([]);
    const [fullDonationData, setFullDontaionData] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [needOrderData, setNeedOredrData] = useState([]);
    const [fullNeedData, setFullNeedData] = useState([]);
    const { userId } = useAuth();

    const saveUserData = () => {
        if (localStorage.getItem("donationList") !== null) {
            const data = JSON.parse(localStorage.getItem("donationList")).filter(user => (user.userOrderd === userId));
            setDonationOredrData(data);
        }

        if (localStorage.getItem("needList") !== null) {
            const data = JSON.parse(localStorage.getItem("needList")).filter(user => (user.userOrderd === userId));
            setNeedOredrData(data);
        }
    };

    const getDonation = async (endPoint, callback) => {
        try {
            const apiLink = `https://api.donority.site/api/${endPoint}`;
            const { data } = await axios.get(apiLink);
            const { Code, data: dataRespons } = data;
            if (Code === 200) {
                callback(dataRespons);
            } else {
                callback([]);
            }
        } catch (error) {
            console.error("Error fetching donations:", error);
            callback([]);
        }
    };

    const getMixedData = (orderData, callback, type) => {
        const userOrder = orderData.map((order) =>
            type.find((item) => item.serial === +order.donationId)
            
        );
        if (
            userOrder.every((item) => item !== undefined) &&
            userOrder.length !== 0
        ) {
            const mixedData = userOrder
                .map((order) => {
                    const user = orderData.find(
                        (user) => +user.donationId === order.serial
                    );
                    return { ...order, ...user };
                })
            callback(mixedData);
        }
    }

    useEffect(() => {
        (async () => {
            saveUserData();
            await getDonation("GetDonationsAll", setDonations);
            await getDonation("GetInneedAll", setNeeds);
        })();
    }, []);

    useEffect(() => {
        getMixedData(donationOrderData, setFullDontaionData, donations)
    }, [donationOrderData, donations]);

    useEffect(() => {
        getMixedData(needOrderData, setFullNeedData, needs)
    }, [needOrderData, needs]);

    return (
        <RequestContext.Provider value={{ fullDonationData, fullNeedData }}>
            {children}
        </RequestContext.Provider>
    );
};

