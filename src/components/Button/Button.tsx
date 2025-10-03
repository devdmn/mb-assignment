import styles from "./Button.module.css";
import React from "react";

type ButtonProps = {
  variant?: "default" | "icon";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  variant = "default",
  style,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
