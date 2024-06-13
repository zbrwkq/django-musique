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
import Albums from "./routes/pages/albums";
import Artists from "./routes/pages/artists";
import Tracks from "./routes/pages/tracks";
import Profil from "./routes/pages/profil";

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
  {
    path: "/albums",
    element: <Albums />,
  },
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/tracks",
    element: <Tracks />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Topbar />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);
