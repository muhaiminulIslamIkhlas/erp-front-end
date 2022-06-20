import React from "react";
import "./input.scss";

interface InputProps {
  name: string;
  label: string | boolean;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  type: string;
  error?: string;
  placeHolder?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  type,
  error,
  placeHolder,
  ...props
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeHolder}
        {...props}
        className="a-input"
      />
      {error && <div className="a-input__error">{error}</div>}
    </div>
  );
};

export default Input;
