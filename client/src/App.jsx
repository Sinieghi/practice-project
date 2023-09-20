import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Adim,
  EditJob,
} from "./pages";
import { action as registerActions } from "./pages/Register";
import { actions as loginActions } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { actions as createJobAction } from "./pages/AddJob";
import { loader as allJobsLoader } from "./pages/AllJobs";
import { actions as editActions } from "./pages/EditJob";
import { loader as editLoader } from "./pages/EditJob";
import { action as deleteAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Adim";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};
checkDefaultTheme();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerActions,
      },
      {
        path: "login",
        element: <Login />,
        action: loginActions,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            action: createJobAction,
            element: <AddJob />,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "all-jobs",
            loader: allJobsLoader,
            element: <AllJobs />,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Adim />,
            loader: adminLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            action: editActions,
            loader: editLoader,
          },
          {
            path: "delete-job/:id",
            action: deleteAction,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
