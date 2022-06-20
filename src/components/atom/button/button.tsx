import React from "react";
import './button.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button className="a-button" onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
