import react from "react";
import { Redirect } from "react-router-dom";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import Homepage from "./pages/homepage/Homepage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { RouteType } from "./components/navigation/RouteType";
import RegisterPage from "./pages/registerPage/RegisterPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import UserInfo from "./components/userInfo/UserInfo";
import ChangePassword from "./components/changePassword/ChangePassword";
import RenderRoutes from "./components/RenderRoutes";
import ProjectPage from "./pages/projectsPage/ProjectsPage";

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

  {
    path: "/projects",
    Component: ProjectPage,
    exact: true,
    routes: [],
    key: "Projects",
    navigationPos: "start",
    login: true,
  },

  {
    path: "/my-profile",
    Component: RenderRoutes,
    exact: false,
    routes: [
      {
        path: "/my-profile",
        key: "My Profile Root",
        exact: true,
        Component: () => {
          const user = useTypedSelector((state) => state.user.user);
          if (user) {
            return (
              <ProfilePage>
                <UserInfo />
              </ProfilePage>
            );
          }
          return <Redirect to="/" />;
        },
        navigationPos: "end",
        login: true,
        routes: [],
      },

      {
        path: "/my-profile/changePassword",
        key: "ChangePassword",
        exact: true,
        Component: () => {
          const user = useTypedSelector((state) => state.user.user);
          if (user) {
            return (
              <ProfilePage>
                <ChangePassword />
              </ProfilePage>
            );
          }
          return <Redirect to="/" />;
        },
        navigationPos: "end",
        login: true,
        routes: [],
      },
      {
        path: "/my-profile/myProfile",
        key: "ChangePassword",
        exact: true,
        Component: UserInfo,
        navigationPos: "end",
        login: true,
        routes: [],
      },
    ],
    key: "MyProfile",
    navigationPos: "end",
    login: true,
  },
];
