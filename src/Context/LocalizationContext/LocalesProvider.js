import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LocalesContext } from './LoclaesContext';




export const LocalizationProvider = ({ children }) => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState("en");

    const saveUserOption = () => {
        if (localStorage.getItem("language") !== null) {
            const selectOption = localStorage.getItem("language");
            changeLanguage(selectOption);
        }
    };

    useEffect(() => {
        saveUserOption();
    }, [language]);

    const changeLanguage = (lng) => {
        setLanguage(lng);
        localStorage.setItem("language", lng);
        const rootElement = document.documentElement;
        rootElement.setAttribute("dir", lng === "ar" ? "rtl" : "ltr");
        rootElement.setAttribute("lang", lng === "ar" ? "ar" : "en");
        i18n.changeLanguage(lng);
    };

    return (
        <LocalesContext.Provider value={{ t, changeLanguage, language }}>
            {children}
        </LocalesContext.Provider>
    );
};