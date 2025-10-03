import styles from "./Card.module.css";
import React from "react";

const Card: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
> = ({ children, className = "", ...props }) => {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
