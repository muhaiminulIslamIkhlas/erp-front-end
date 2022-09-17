import React from "react";
import "./container.scss";

interface ContainerProps {
  children: React.ReactNode;
  margin?: "0" | "4" | "8" | "12" | "16" | "20" | "24";
  align?: "center" | "right" | "left";
}

const Container: React.FC<ContainerProps> = ({ children, margin, align }) => {
  return (
    <div
      className={`a-container a-container--${
        margin && margin
      } a-container a-container--${align && align}`}
    >
      {children}
    </div>
  );
};

export default Container;
