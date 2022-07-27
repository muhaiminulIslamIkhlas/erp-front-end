import React from "react";
import './button.scss';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled: boolean;
  type ?:'primary'| 'default'
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled,type }) => {
  return (
    <button className={`a-button ${type ? 'a-button--'+type: 'a-button--default'}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
