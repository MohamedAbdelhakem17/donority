import React, { useState, useEffect } from "react";
import axios from "axios";
import { RequestContext } from "./RequestDetailsContext";

export const RequestDetailsProvider = ({ children }) => {
    const [donations, setDonations] = useState([]);
    const [orderData, setOrderData] = useState([]);
    const [fullOrderData, setFullOrderData] = useState([]);

    useEffect(() => {
        const saveUserData = () => {
            if (localStorage.getItem("orderList") !== null) {
                const data = JSON.parse(localStorage.getItem("orderList"));
                setOrderData(data);
            }
        };

        const getDonation = async () => {
            try {
                const apiLink = "https://api.donority.site/api/GetDonationsAll";
                const { data } = await axios.get(apiLink);
                const { Code, data: dataRespons } = data;

                if (Code === 200) {
                    setDonations(dataRespons);
                } else {
                    setDonations([]);
                }
            } catch (error) {
                console.error("Error fetching donations:", error);
                setDonations([]);
            }
        };

        const initializeData = async () => {
            saveUserData();
            await getDonation();
        };

        initializeData();
    }, []);

    useEffect(() => {
        const userOrder = orderData.map(order =>
            donations.find(donation => donation.serial === order.donationId)
        );
        if (userOrder.every(item => item !== undefined) && userOrder.length !== 0) {
            const mixedData = userOrder.map(order => {
                const user = orderData.find(user => user.donationId === order.serial);
                return { ...order, ...user };
            });
            setFullOrderData(mixedData);
        }


    }, [orderData, donations]);

    return (
        <RequestContext.Provider value={{ fullOrderData }}>
            {children}
        </RequestContext.Provider>
    );
};