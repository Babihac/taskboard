import React, { useEffect } from "react";
import "./app.scss";
import Navigation from "./components/navigation/Navigation";
import TaskBoard from "./components/TaskBoard/TaskBoard";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import { useUserAction } from "./hooks/useUserAction";
import Homepage from "./pages/homepage/Homepage";
import { routes } from "./routes";
import RenderRoutes from "./components/RenderRoutes";
function App() {
  const { authenticateUser } = useUserAction();

  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <>
      <Navigation />

      <RenderRoutes routes={routes} />

      {/* <Switch>
        <Route exact={true} path="/">
          <div className="container">
            <Homepage />
          </div>
        </Route>

        <Route exact={true} path="/taskboard">
          <div className="container">
            <TaskBoard />
          </div>
        </Route>

        <Route exact={true} path="/login">
          <LoginPage />
        </Route>
      </Switch> */}
    </>
  );
}

export default App;
