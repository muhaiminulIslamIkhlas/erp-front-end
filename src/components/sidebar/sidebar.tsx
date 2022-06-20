import React, { useState } from "react";
import "./sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { MdRedeem } from "react-icons/md";
import { SiBbciplayer } from "react-icons/si";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { Navigate, NavLink } from "react-router-dom";

interface SidebarProps {
  children?: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const handleSidebarIconClick = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div
      className={`sidebar ${
        sidebarOpen ? "sidebar--active" : "sidebar--close"
      }`}
    >
      <div className="sidebar__logoWrapper">
        {sidebarOpen && (
          <span className="sidebar__logo">
            <svg
              width="80.74941451990632"
              height="32"
              viewBox="0 0 2155 854"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M985.058 284.2C953.411 284.2 937.587 301.4 937.587 335.8V355H1025.92V415H939.991V673H864.879V415H812V355H864.879V334.6C864.879 300.2 874.894 273.2 894.924 253.6C914.953 233.6 943.195 223.6 979.65 223.6C1008.49 223.6 1031.13 229.4 1047.55 241L1026.52 297.4C1013.7 288.6 999.88 284.2 985.058 284.2Z"
                fill="currentColor"
              ></path>
              <path
                d="M1193.19 349C1240.46 349 1276.52 360.4 1301.35 383.2C1326.59 405.6 1339.21 439.6 1339.21 485.2V673H1268.3V634C1259.09 648 1245.87 658.8 1228.65 666.4C1211.82 673.6 1191.39 677.2 1167.35 677.2C1143.32 677.2 1122.29 673.2 1104.26 665.2C1086.23 656.8 1072.21 645.4 1062.2 631C1052.58 616.2 1047.78 599.6 1047.78 581.2C1047.78 552.4 1058.39 529.4 1079.62 512.2C1101.26 494.6 1135.11 485.8 1181.18 485.8H1264.1V481C1264.1 458.6 1257.29 441.4 1243.67 429.4C1230.45 417.4 1210.62 411.4 1184.18 411.4C1166.15 411.4 1148.33 414.2 1130.7 419.8C1113.47 425.4 1098.85 433.2 1086.83 443.2L1057.39 388.6C1074.22 375.8 1094.45 366 1118.08 359.2C1141.72 352.4 1166.75 349 1193.19 349ZM1182.98 622.6C1201.81 622.6 1218.43 618.4 1232.85 610C1247.67 601.2 1258.09 588.8 1264.1 572.8V535.6H1186.58C1143.32 535.6 1121.69 549.8 1121.69 578.2C1121.69 591.8 1127.09 602.6 1137.91 610.6C1148.73 618.6 1163.75 622.6 1182.98 622.6Z"
                fill="currentColor"
              ></path>
              <path
                d="M1585.76 677.2C1552.51 677.2 1522.67 670.2 1496.23 656.2C1469.79 642.2 1449.16 622.8 1434.34 598C1419.51 572.8 1412.1 544.4 1412.1 512.8C1412.1 481.2 1419.51 453 1434.34 428.2C1449.16 403.4 1469.59 384 1495.63 370C1522.07 356 1552.11 349 1585.76 349C1617.41 349 1645.05 355.4 1668.68 368.2C1692.72 381 1710.75 399.4 1722.76 423.4L1665.08 457C1655.87 442.2 1644.25 431.2 1630.23 424C1616.61 416.4 1601.58 412.6 1585.16 412.6C1557.12 412.6 1533.88 421.8 1515.46 440.2C1497.03 458.2 1487.81 482.4 1487.81 512.8C1487.81 543.2 1496.83 567.6 1514.86 586C1533.28 604 1556.72 613 1585.16 613C1601.58 613 1616.61 609.4 1630.23 602.2C1644.25 594.6 1655.87 583.4 1665.08 568.6L1722.76 602.2C1710.35 626.2 1692.12 644.8 1668.08 658C1644.45 670.8 1617.01 677.2 1585.76 677.2Z"
                fill="currentColor"
              ></path>
              <path
                d="M1787.69 352.6H1862.81V673H1787.69V352.6ZM1825.55 299.8C1811.93 299.8 1800.51 295.6 1791.3 287.2C1782.09 278.4 1777.48 267.6 1777.48 254.8C1777.48 242 1782.09 231.4 1791.3 223C1800.51 214.2 1811.93 209.8 1825.55 209.8C1839.17 209.8 1850.59 214 1859.8 222.4C1869.02 230.4 1873.62 240.6 1873.62 253C1873.62 266.2 1869.02 277.4 1859.8 286.6C1850.99 295.4 1839.57 299.8 1825.55 299.8Z"
                fill="currentColor"
              ></path>
              <path
                d="M2154.28 655.6C2145.47 662.8 2134.65 668.2 2121.83 671.8C2109.41 675.4 2096.19 677.2 2082.17 677.2C2046.92 677.2 2019.68 668 2000.45 649.6C1981.22 631.2 1971.61 604.4 1971.61 569.2V415H1918.73V355H1971.61V281.8H2046.72V355H2132.65V415H2046.72V567.4C2046.72 583 2050.52 595 2058.13 603.4C2065.75 611.4 2076.76 615.4 2091.18 615.4C2108.01 615.4 2122.03 611 2133.25 602.2L2154.28 655.6Z"
                fill="currentColor"
              ></path>
              <path
                d="M1824.4 200L1879.83 230.098V290.295L1824.4 320.393L1768.97 290.295V230.098L1824.4 200Z"
                fill="#F35421"
              ></path>
              <rect
                x="300"
                width="256"
                height="256"
                rx="64"
                fill="#46BCAA"
              ></rect>
              <circle cx="128" cy="726" r="128" fill="#4D69FA"></circle>
              <rect
                x="300"
                y="355"
                width="256"
                height="144"
                fill="#6C5DD3"
              ></rect>
              <path
                d="M128 24L238.851 216H17.1488L128 24Z"
                fill="#FFCF52"
              ></path>
              <path
                d="M128 307L238.851 367.197V487.59L128 547.787L17.1488 487.59V367.197L128 307Z"
                fill="#F35421"
              ></path>
            </svg>
          </span>
        )}

        <span className="sidebar__arrow" onClick={handleSidebarIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 24 24"
            width="1em"
            className="svg-icon--material svg-icon brand-aside-toggle-close"
            data-name="Material--FirstPage"
          >
            <path d="M24 0v24H0V0h24z" fill="none" opacity="0.87"></path>
            <path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6h2v12H6V6z"></path>
          </svg>
        </span>
      </div>
      <div className="sidebar__content">
        <NavLink to="/dashboard">
          <div className="sidebar__item">
            <span className="sidebar__itemWrapper">
              <span className="sidebar__icon">
                <MdDashboard />
              </span>
              <span className="sidebar__text">Dashboard</span>
            </span>
          </div>
        </NavLink>

        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <FaHospitalUser />
            </span>
            <span className="sidebar__text">Dashboard Booking</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <FaLayerGroup />
            </span>
            <span className="sidebar__text">CRM Dashboard</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <MdRedeem />
            </span>
            <span className="sidebar__text">Summery</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <SiBbciplayer />
            </span>
            <span className="sidebar__text">List Page</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <AiOutlineUsergroupDelete />
            </span>
            <span className="sidebar__text">User</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <MdRedeem />
            </span>
            <span className="sidebar__text">Sales</span>
          </span>
        </div>
        <div className="sidebar__item">
          <span className="sidebar__itemWrapper">
            <span className="sidebar__icon">
              <FaLayerGroup />
            </span>
            <span className="sidebar__text">Blank</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
