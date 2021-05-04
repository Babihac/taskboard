import { link } from "node:fs";
import react, { FC } from "react";
import { Link } from "react-router-dom";
interface NavigationItemProps {
  linkTo: string;
  link: string;
}
const NavigationItem: FC<NavigationItemProps> = ({
  linkTo,
  link,
  children,
}) => {
  return (
    <Link className="navbar-item" to={linkTo}>
      {children}
    </Link>
  );
};

export default NavigationItem;
