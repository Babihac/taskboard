import react, { FC } from "react";
import { Route, Switch } from "react-router";
import { RouteType } from "./navigation/RouteType";
import RouteWithSubRoutes from "./RouteWithSubRoutes";
interface renderRoutesProps {
  routes: RouteType[];
}
const RenderRoutes: FC<renderRoutesProps> = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        console.log(route);
        return (
          <Route
            exact={route.exact}
            path={route.path}
            render={(props) => (
              <route.Component {...props} routes={route.routes} />
            )}
          />
        );
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

export default RenderRoutes;