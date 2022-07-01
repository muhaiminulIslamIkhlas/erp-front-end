import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJwt } from "../../../services/authServices";
import "./pos.scss";

interface PosProps {
  children: React.ReactNode;
}

const Pos: React.FC<PosProps> = ({ children }) => {
    const navigate = useNavigate();
    useEffect(()=>{
      const token = getJwt();
      if(!token){
        // navigate('login');
      }
    })
  return <div className="t-pos">{children}</div>;
};

export default Pos;
