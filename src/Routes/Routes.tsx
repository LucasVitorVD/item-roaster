import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/Pages/home/Home"
import Login from "@/Pages/login/Login";
import Register from "@/Pages/register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", element: <Home />
      },
      {
        path: "/login", element: <Login />
      },
      {
        path: "/register", element: <Register />
      },
    ]
  }
])