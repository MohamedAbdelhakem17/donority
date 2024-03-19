import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function MasterLayout() {
  const [loading, setLoading] = useState(true);

  const handleDOMContentLoaded = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1500)
  };

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    handleDOMContentLoaded();
  }, []);

  return loading ? <LoadingScreen /> : <Outlet />;
}
