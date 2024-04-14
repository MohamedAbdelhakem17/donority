import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signin from "../Authentication/Signin/Signin";
import Signup from "../Authentication/Signup/Signup";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const Base_API_URL = "https://api.donority.site/api/"

const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home apiLink={Base_API_URL} /> },
      { path: "/signin", element: <ProtectedRoute><Signin apiLink={Base_API_URL} /></ProtectedRoute> },
      { path: "/signup", element: <ProtectedRoute ><Signup apiLink={Base_API_URL} /></ProtectedRoute> }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
