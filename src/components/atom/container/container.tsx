import React from "react";
import "./container.scss";

interface ContainerProps {
  children: React.ReactNode;
  margin?: "8" | "12" | "16" | "20" | "24";
}

const Container: React.FC<ContainerProps> = ({ children, margin }) => {
  return (
    <div className={`a-container a-container--${margin && margin}`}>
      {children}
    </div>
  );
};

export default Container;
