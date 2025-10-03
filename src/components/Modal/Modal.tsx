// src/components/Modal/Modal.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    document.body.classList.add("modal-open");

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
