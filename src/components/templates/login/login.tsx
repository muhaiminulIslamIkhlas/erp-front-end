import React from "react";
import './login.scss'

interface LoginProps {
  children: React.ReactNode;
}

const Login: React.FC<LoginProps> = ({ children }) => {
  return <div className="p-login">{children}</div>;
};

export default Login;
