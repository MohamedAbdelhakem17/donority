import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Navbar from '../Navbar/Navbar';

export default function MasterLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false)
  }, []);

  return loading ? <LoadingScreen /> : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
