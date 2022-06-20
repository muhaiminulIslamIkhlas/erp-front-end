import React from "react";
import "./mainBody.scss";
import { FcBusinesswoman } from "react-icons/fc";
import { FcBiotech } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { FcAddImage } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcAssistant } from "react-icons/fc";
import { MdLogout } from "react-icons/md";
import authServices from "../../../services/authServices";
import { useNavigate } from "react-router-dom";

interface MainBodyProps {
  children: React.ReactNode;
}

const MainBody: React.FC<MainBodyProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = () =>{
    authServices.logout();
    navigate('login')
  }
  return (
    <div className="mainBody">
      <div className="topBar">
        <div className="topBar__link">
          <div className="topBar__badgeContainer">
            <p className="topBar__badge">
              <span className="topBar__badge__icon">
                <FcBiotech />
              </span>
              <span className="topBar__badge__text">Intro</span>
            </p>
          </div>
          <div className="topBar__badgeContainer">
            <p className="topBar__badge">
              <span className="topBar__badge__icon">
                <FcBiotech />
              </span>
              <span className="topBar__badge__text">Intro</span>
            </p>
          </div>
          <div className="topBar__badgeContainer">
            <p className="topBar__badge">
              <span className="topBar__badge__icon">
                <FcBiotech />
              </span>
              <span className="topBar__badge__text">Intro</span>
            </p>
          </div>
          <div className="topBar__badgeContainer">
            <p className="topBar__badge">
              <span className="topBar__badge__icon">
                <FcBiotech />
              </span>
              <span className="topBar__badge__text">Intro</span>
            </p>
          </div>
          <div className="topBar__badgeContainer">
            <p className="topBar__badge">
              <span className="topBar__badge__icon">
                <FcBiotech />
              </span>
              <span className="topBar__badge__text">Intro</span>
            </p>
          </div>
        </div>
        <div className="topBar__notification">
          <span className="topBar__notification__item">
            <FcAddImage />
          </span>
          <span className="topBar__notification__item">
            <FcAdvertising />
          </span>
          <span className="topBar__notification__item">
            <FcAddDatabase />
          </span>
          <span onClick={handleLogout} className="topBar__notification__item">
            <MdLogout />
          </span>
        </div>
        <div className="topBar__userInfo">
          <div className="topBar__info">
            <span className="topBar__name">Muhaimin</span>
            <span className="topBar__designation">Admin</span>
          </div>
          <span className="topBar__icon">
            <FcBusinesswoman />
          </span>
        </div>
      </div>
      <div className="card">{children}</div>
    </div>
  );
};

export default MainBody;
