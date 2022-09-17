import React from "react";
import "./badge.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  isLarge?: boolean;
}

const Badge: React.FC<ButtonProps> = ({ label, onClick, isLarge }) => {
  return (
    <span className={`a-badge ${isLarge && 'a-badge--large'}`} onClick={onClick}>
      {label}
    </span>
  );
};

export default Badge;
