import react, { FC } from "react";
import { Route, RouteComponentProps } from "react-router";
import { RouteType } from "./navigation/RouteType";

interface RouteWithSubRoutesProps {
  route: RouteType;
}

const RouteWithSubRoutes: FC<RouteWithSubRoutesProps> = ({ route }) => {
  console.log(route);
  return (
    <Route
      exact={route.exact}
      path={route.path}
      render={(props) => <route.Component {...props} routes={route.routes} />}
    />
  );
};
export default RouteWithSubRoutes;
