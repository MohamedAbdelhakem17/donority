import React from 'react';
import ReactDOM from 'react-dom/client';
import AOS from 'aos';
import App from "./Component/App/App";
import AuthProvider from './Context/AuthContext/AuthProvider';
import { LocalizationProvider } from './Context/LocalizationContext/LocalesProvider';
import "@fortawesome/fontawesome-free/css/all.min.css"
import 'aos/dist/aos.css';
import './i18n/config';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Static/css/index.css';
import './Static/css/responsive.css';

AOS.init();
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <LocalizationProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LocalizationProvider>
  </React.StrictMode>
);

