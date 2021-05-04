import react, { FC } from "react";
import NavigationMenu from "./NavigationMenu";
import "./navigation.scss";

const Navigation: FC = () => {
  return (
    <nav className="navbar is-transparent  navigation ">
      <div className="navbar-brand">
        <a className="navbar-item">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          ></img>
        </a>
        <div
          className="navbar-burger"
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <NavigationMenu />
    </nav>
  );
};

export default Navigation;
