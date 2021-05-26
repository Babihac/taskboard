import react, { FC } from "react";
import { Link } from "react-router-dom";
import "./leftMenu.scss";

interface LeftMenuProps {
  links: {
    name: string;
    link: string;
  }[];
}

const LeftMenu: FC<LeftMenuProps> = ({ children, links }) => {
  return (
    <div className="box update-profile-box">
      <div className="right-menu">
        {links.map((link) => (
          <Link key={link.name} to={link.link}>
            {link.name}
          </Link>
        ))}
      </div>
      {children}
    </div>
  );
};

export default LeftMenu;
