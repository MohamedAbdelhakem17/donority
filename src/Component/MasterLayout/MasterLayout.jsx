import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Navbar from '../Navbar/Navbar';

export default function MasterLayout() {
  const [loading, setLoading] = useState(true);

  const handleDOMContentLoaded = () => {
    setLoading(false);
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    handleDOMContentLoaded();
  }, []);

  return loading ? <LoadingScreen /> : <>
    <Navbar />
    <Outlet />
  </>;
}
