import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import MasterLayout from "../MasterLayout/MasterLayout";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import Signin from "../Authentication/Signin/Signin";
import Signup from "../Authentication/Signup/Signup";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import DonaiationType from "../DonaiationType/DonaiationType";
import Needs from "../Needs/Needs";
import UserProfile from "../User/UserProfile/UserProfile";
import UserRequest from "../User/UserRequest/UserRequest";
import AddNeed from "../User/InNeed/InNeed";
import AddDonaiation from "../User/AddDonaiation/AddDonaiation";
import UserDonation from "../User/UserDonation/UserDonation";
import DonaitionDetails from "../DonaitionDetails/DonaitionDetails";
import ItemDetailsProvider from "../../Context/ItemDetails/ItemDetailsProvider";
import { AuthProtectedRoute, DashboardProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { RequestDetailsProvider } from "../../Context/RequestDetails/RequestDetailsProvider";
import RequestDetails from '../User/RequestDetails/RequestDetails';
import NeedDetails from '../NeedDetails/NeedDetails';

const Base_API_URL = "https://api.donority.site/api/";
const router = createHashRouter([
  { errorElement: <NotFound /> },
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home apiLink={Base_API_URL} /> },
      { path: "/donation/:type", element: <ItemDetailsProvider><DonaiationType apiLink={Base_API_URL} /></ItemDetailsProvider> },
      { path: "/donation-details/:id", element: <ItemDetailsProvider><DonaitionDetails apiLink={Base_API_URL} /></ItemDetailsProvider> },
      { path: "/needs/:type", element: <ItemDetailsProvider><Needs apiLink={Base_API_URL} /></ItemDetailsProvider> },
      { path: "/need-details/:id", element: <ItemDetailsProvider><NeedDetails apiLink={Base_API_URL} /></ItemDetailsProvider> },
      { path: "/signin", element: <AuthProtectedRoute><Signin apiLink={Base_API_URL} /></AuthProtectedRoute> },
      { path: "/signup", element: <AuthProtectedRoute><Signup apiLink={Base_API_URL} /></AuthProtectedRoute> },
      { path: "/reset-password", element: <AuthProtectedRoute><ResetPassword apiLink={Base_API_URL} /></AuthProtectedRoute> },
      { path: "/user-profile", element: <DashboardProtectedRoute><UserProfile apiLink={Base_API_URL} /></DashboardProtectedRoute> },
      { path: "/user-request/:type", element: <DashboardProtectedRoute><RequestDetailsProvider><UserRequest apiLink={Base_API_URL} /></RequestDetailsProvider></DashboardProtectedRoute> },
      { path: "/user-request/details/:id", element: <DashboardProtectedRoute><RequestDetailsProvider><RequestDetails /></RequestDetailsProvider></DashboardProtectedRoute> },
      { path: "/in-need", element: <DashboardProtectedRoute><AddNeed apiLink={Base_API_URL} /></DashboardProtectedRoute> },
      { path: "/add-donation", element: <DashboardProtectedRoute><AddDonaiation apiLink={Base_API_URL} /></DashboardProtectedRoute> },
      { path: "/user-donation", element: <DashboardProtectedRoute><UserDonation apiLink={Base_API_URL} /></DashboardProtectedRoute> },
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
