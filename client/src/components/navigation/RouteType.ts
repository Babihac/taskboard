export interface RouteType {
  path: string;
  exact: boolean;
  Component: React.FunctionComponent<any>;
  routes?: RouteType[];
  key: string;
  navigationPos: "start" | "end";
  login: boolean;
}
