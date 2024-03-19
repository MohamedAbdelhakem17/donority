import { useState } from "react";
import Home from "../Home/Home";
import MasterLayout from "../MasterLayout/MasterLayout";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const Base_API_URL = "http://localhost:3000"
const router = createBrowserRouter([
  {
    path: "",
    element: <MasterLayout />,
    children: [
      { index: true, element: <Home apiLink={Base_API_URL} /> },
    ]
  }
]);

function App() {
  const [passwordToggle, setPasswordToggle] = useState(true);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
