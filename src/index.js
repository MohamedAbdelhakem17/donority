import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Static/css/index.css';
import './Static/css/responsev.css';
import ReactDOM from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css"
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from "./Component/App/App";
import AuthProvider from './Context/AuthContext/AuthProvider';
import './i18n/config';
import { LocalizationProvider } from './Context/LocalizationContext/LocalesProvider';
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

