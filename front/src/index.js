import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./hooks/AuthProvider";
import Login from "./routes/auth/login";
import Topbar from "./components/topbar";
import Register from "./routes/auth/register";
import Albums from "./routes/pages/albums";
import Album from "./routes/pages/album";
import Artists from "./routes/pages/artists";
import Tracks from "./routes/pages/tracks";
import Profil from "./routes/pages/profil";
import Home from "./routes/pages/home/home";
import Artist from "./routes/pages/artist";
import Friend from "./routes/pages/friend";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
    path: "/album/:id",
    element: <Album />,
  },
  {
    path: "/artists",
    element: <Artists />,
  },
  {
    path: "/artist/:id",
    element: <Artist />,
  },
  {
    path: "/tracks",
    element: <Tracks />,
  },
  {
    path: "/profil",
    element: <Profil />,
  },
  {
    path: "/friend/:friendId",
    element: <Friend />
  }
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
