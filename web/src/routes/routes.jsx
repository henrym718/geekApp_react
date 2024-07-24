import { createBrowserRouter } from "react-router-dom";

import Layout from "./../layouts";
import Profile from "./../features/profile";
import Home from "./../features/home";
import NewGig from "./../features/createGig";
import Auth from "./../features/auth";
import ListGigsView from "../features/listGig";
import DetailGig from "../features/detailGig";

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
    path: "/next",
    element: <Auth />,
  },
]);
