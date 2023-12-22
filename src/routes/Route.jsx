import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import TaskLayout from "../layout/TaskLayout";
import CreateTask from "../pages/TaskManagement/CreateTask";
import TaskList from "../pages/TaskManagement/TaskList";
import OngoingTask from "../pages/TaskManagement/OngoingTask";
import CompletedTask from "../pages/TaskManagement/CompletedTask";
import AboutUs from "../pages/About/AboutUs";
import ContactUs from "../pages/Contact/ContactUs";
import ErrorPage from "../pages/ErrorPage";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "tasks",
    element: <TaskLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "create-task",
        element: <CreateTask />,
      },
      {
        path: "todo",
        element: <TaskList />,
      },
      {
        path: "ongoing",
        element: <OngoingTask />,
      },
      {
        path: "completed",
        element: <CompletedTask />,
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

export default Route;
