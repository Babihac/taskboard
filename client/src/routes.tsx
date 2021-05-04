import react from "react";
import { Redirect } from "react-router-dom";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import Homepage from "./pages/homepage/Homepage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { RouteType } from "./components/navigation/RouteType";
import RegisterPage from "./pages/registerPage/RegisterPage";

export const routes: RouteType[] = [
  {
    path: "/",
    Component: Homepage,
    exact: true,
    routes: [],
    key: "Homepage",
    navigationPos: "start",
    login: false,
  },
  {
    path: "/login",
    Component: LoginPage,
    exact: true,
    routes: [],
    key: "Login",
    navigationPos: "end",
    login: false,
  },

  {
    path: "/taskboard",
    Component: () => {
      const user = useTypedSelector((state) => state.user.user);
      if (user) {
        return <TaskBoard />;
      }
      return <Redirect to="/login" />;
    },
    exact: true,
    routes: [],
    key: "Taskboard",
    navigationPos: "start",
    login: true,
  },

  {
    path: "/logout",
    Component: () => {
      const user = useTypedSelector((state) => state.user.user);
      if (user) {
        return <h1>You have been logged out</h1>;
      }
      return <Redirect to="/" />;
    },
    exact: true,
    routes: [],
    key: "Logout",
    navigationPos: "end",
    login: true,
  },
  {
    path: "/register",
    Component: RegisterPage,
    exact: true,
    routes: [],
    key: "Register",
    navigationPos: "end",
    login: false,
  },
];
