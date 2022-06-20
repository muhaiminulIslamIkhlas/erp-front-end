import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJwt } from "../../../services/authServices";
import MainBody from "../../organism/mainBody/mainBody";
import Sidebar from "../../sidebar/sidebar";
import './admin.scss';

interface AdminProps {
  children: React.ReactNode;
}

const Admin: React.FC<AdminProps> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(()=>{
    const token = getJwt();
    if(!token){
      navigate('login');
    }
  })
  return (
    <div className="dashboard__wrapper">
      <Sidebar />
      <MainBody>{children}</MainBody>
    </div>
  );
};

export default Admin;
