import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Signin from "../Authentication/Signin/Signin";
import Signup from "../Authentication/Signup/Signup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import NotFound from "../NotFound/NotFound";
import DonaiationType from "../DonaiationType/DonaiationType";
import UserProfile from "../User/UserProfile/UserProfile";
import UserRequest from "../User/UserRequest/UserRequest";
import InNeed from "../User/InNeed/InNeed";
import Needs from "../Needs/Needs";
import AddDonaiation from "../User/AddDonaiation/AddDonaiation";

const Base_API_URL = "https://api.donority.site/api/"
const router = createBrowserRouter([
  { errorElement: <NotFound /> },
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home apiLink={Base_API_URL} /> },
      { path: "/donaiton/:type", element: <DonaiationType apiLink={Base_API_URL} /> },
      { path: "/needs", element: <Needs apiLink={Base_API_URL} /> },
      { path: "/signin", element: <ProtectedRoute><Signin apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/signup", element: <ProtectedRoute ><Signup apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/reset-password", element: <ProtectedRoute ><ResetPassword apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/user-profile", element: <ProtectedRoute ><UserProfile apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/user-request", element: <ProtectedRoute ><UserRequest apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/in-need", element: <ProtectedRoute ><InNeed apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/add-donaiation", element: <ProtectedRoute ><AddDonaiation apiLink={Base_API_URL}/></ProtectedRoute> },
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
