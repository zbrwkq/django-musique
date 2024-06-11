import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./hooks/AuthProvider";
import Login from "./routes/auth/login";
import Topbar from "./components/topbar";
import Register from "./routes/auth/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Topbar />
    <RouterProvider router={router}>
      <AuthProvider></AuthProvider>
    </RouterProvider>
  </React.StrictMode>
);
