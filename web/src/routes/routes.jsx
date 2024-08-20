import { createBrowserRouter } from "react-router-dom";

import Layout from "./../pages/layouts";
import Profile from "./../pages/profile";
import Home from "./../pages/home";
import NewGig from "./../pages/createGig";
import Auth from "../pages/auth";
import ListGigsView from "../pages/listGig";
import DetailGig from "../pages/detailGig";

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/newGig",
        element: <NewGig />,
      },
      {
        path: "/gigs",
        element: <ListGigsView />,
      },
      {
        path: "/:author/:title",
        element: <DetailGig />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <Auth />,
  },
]);
