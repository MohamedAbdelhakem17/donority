import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";

export default function MasterLayout() {
  const [loading, setLoading] = useState(true);

  const handleDOMContentLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    handleDOMContentLoaded();
  }, []);
  const { changeLanguage } = useLocalization()

  return loading ? <LoadingScreen /> : <>
    <h2>
      <button className='btn btn-danger mx-5' onClick={() => changeLanguage("ar")}>ar</button>
      <button className='btn btn-danger' onClick={() => changeLanguage("en")}>en</button>
    </h2>
    <Outlet />
  </>;
}
