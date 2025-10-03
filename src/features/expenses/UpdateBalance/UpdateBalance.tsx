import React, { useCallback, useState } from "react";
import styles from "./UpdateBalance.module.css";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";

type UpdateBalanceProps = {
  submitHandler: (amount: number) => void;
  cancelHandler: () => void;
};

const UpdateBalance: React.FC<UpdateBalanceProps> = ({
  submitHandler,
  cancelHandler,
}) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (amount === null || amount < 1) {
        setError(true);
        return;
      }
      submitHandler(amount);
    },
    [amount, submitHandler]
  );

  return (
    <Modal onClose={cancelHandler}>
      <Card className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Add Balance</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            className={styles.input}
            placeholder="Amount"
            type="number"
            value={amount || ""}
            min={1}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? null : Number(value));
              setError(false);
            }}
          />
          <Button className={styles.submit} type="submit">
            Add Balance
          </Button>
          <Button
            className={styles.cancel}
            type="button"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
          {error && <p className={styles.error}>Amount must be at least ₹1</p>}
        </form>
      </Card>
    </Modal>
  );
};

export default UpdateBalance;
