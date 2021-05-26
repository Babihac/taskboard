import react, { FC } from "react";
import { Link } from "react-router-dom";
import "./profilePage.scss";

const ProfilePage: FC = ({ children }) => {
  return (
    <div className="box update-profile-box">
      <div className="right-menu">
        <Link to="/my-profile" className="menu-item">
          User Info
        </Link>
        <Link to="/my-profile/changePassword" className="menu-item">
          Change Password
        </Link>
        <div className="menu-item">Your Activities</div>
      </div>
      {children}
    </div>
  );
};

export default ProfilePage;
