import React from "react";
import styles from "./Input.module.css";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return <input className={`${styles.input} ${className}`} {...props} />;
};

export default Input;
