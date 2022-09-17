import React from "react";
import Container from "../container/container";
import "./input.scss";

interface InputProps {
  name: string;
  label: string | boolean;
  value: string | any;
  onChange: (e: any) => void;
  type: string;
  error?: string;
  placeHolder?: string;
  options?: { label: string; value: string | number; selected?: boolean }[];
  isLogin?: boolean;
  isdisbled?: boolean;
  defaultSelect?: boolean;
  selectedId?: string | number;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  type,
  error,
  placeHolder,
  options,
  isLogin,
  isdisbled,
  defaultSelect,
  selectedId,
  ...inputProps
}) => {
  return (
    <div>
      {label && (
        <label className="a-input__label" htmlFor={name}>
          {label}
        </label>
      )}
      <Container margin="8">
        {type === "select" && (
          <select name={name} className="a-input" onChange={onChange}>
            <option value="" selected={defaultSelect}>
              Select an option
            </option>
            {options?.map((item) => (
              <option
                value={item.value}
                selected={selectedId === item.value ? true : false}
              >
                {item.label}
              </option>
            ))}
          </select>
        )}
        {type !== "select" && (
          <input
            id={name}
            value={value}
            onChange={onChange}
            type={type}
            name={name}
            placeholder={placeHolder}
            {...inputProps}
            className={`a-input ${isLogin && "a-input--login"}`}
            disabled={isdisbled}
          />
        )}
      </Container>
      {error && <div className="a-input__error">{error}</div>}
    </div>
  );
};

export default Input;
