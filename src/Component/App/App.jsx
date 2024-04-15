import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "../Authentication/Signin/Signin";
import Signup from "../Authentication/Signup/Signup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ResetPassword from "../Authentication/ResetPassword/ResetPassword";
import useLocalization from "../../Context/LocalizationContext/LoclaesContext";

const Base_API_URL = "https://api.donority.site/api/"
const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home apiLink={Base_API_URL} /> },
      { path: "/signin", element: <ProtectedRoute><Signin apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/signup", element: <ProtectedRoute ><Signup apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/reset-password", element: <ProtectedRoute ><ResetPassword apiLink={Base_API_URL} /></ProtectedRoute> },
    ]
  }
]);

function App() {
  const { changeLanguage } = useLocalization()
  return (
    <>
      <h2>
        <button className='btn btn-danger mx-5' onClick={() => changeLanguage("ar")}>ar</button>
        <button className='btn btn-danger' onClick={() => changeLanguage("en")}>en</button>
      </h2>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
