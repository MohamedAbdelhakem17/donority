import React, { useState, useEffect } from "react";
import { RequestContext } from "./RequestDetailsContext";
import useAuth from "../AuthContext/AuthContext";

export const RequestDetailsProvider = ({ children }) => {
    const [fullDonationData, setFullDonationData] = useState([]);
    const [fullNeedData, setFullNeedData] = useState([]);
    const { userId } = useAuth();

    const saveUserData = () => {
        const donationList = localStorage.getItem("donationList");
        if (donationList) {
            const data = JSON.parse(donationList).filter(item => item.userOrderd === userId);
            setFullDonationData(data)
        }

        const needList = localStorage.getItem("needList");
        if (needList) {
            const data = JSON.parse(needList).filter(user => user.userOrderd === userId);
            setFullNeedData(data);
        }
    };

    // const retrev
    useEffect(() => {
        saveUserData()
    }, [fullNeedData, fullDonationData]);
    return (
        <RequestContext.Provider value={{ fullDonationData, fullNeedData }}>
            {children}
        </RequestContext.Provider>
    );
};

