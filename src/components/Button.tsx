import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  role?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, role }) => {
  return (
    <button type="button" onClick={onClick} role={role} className="custom-btn">
      {children}
    </button>
  );
};

export default Button;
