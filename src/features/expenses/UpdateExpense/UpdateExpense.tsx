import React, { useCallback, useState, type FormEvent } from "react";
import styles from "./UpdateExpense.module.css";
import Card from "../../../components/Card/Card";
import type { Expense } from "../types";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import { capitalize } from "../../../app/utils";

type UpdateExpenseProps = {
  type: "edit" | "add";
  data?: Expense;
  submitHandler: (data: Expense) => void;
  cancelHandler: () => void;
};

const UpdateExpense: React.FC<UpdateExpenseProps> = ({
  type,
  data,
  submitHandler,
  cancelHandler,
}) => {
  // Determine if editing or adding
  const isEdit = type === "edit" && data;

  // Form State
  const [name, setName] = useState<string>(isEdit ? data.name : "");
  const [amount, setAmount] = useState<number | null>(
    isEdit ? data.amount : null
  );
  const [date, setDate] = useState<string>(
    isEdit ? data.date.split("T")[0] : ""
  );
  const [category, setCategory] = useState<string>(isEdit ? data.category : "");

  // Error State
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });
  const errorMessage = Object.values(errors).find((err) => err);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Validate
      const newErrors = {
        name: !name.trim() ? "Title is required" : "",
        amount:
          amount === null || amount < 1 ? "Amount must be at least ₹1" : "",
        category: !category.trim() ? "Category is required" : "",
        date: !date
          ? "Date is required"
          : isNaN(new Date(date).getTime())
          ? "Invalid date"
          : "",
      };

      setErrors(newErrors);

      const hasErrors = Object.values(newErrors).some((err) => err);
      if (hasErrors) return;

      const expenseData: Expense = {
        id: isEdit ? data.id : crypto.randomUUID(),
        name: name.trim(),
        amount: amount!,
        date: new Date(date).toISOString(),
        category: capitalize(category.trim()),
      };

      submitHandler(expenseData);
    },
    [submitHandler, name, amount, date, category, isEdit, data]
  );

  return (
    <Modal onClose={cancelHandler}>
      <Card className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>
          {type === "add" ? "Add Expense" : "Edit Expense"}
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            minLength={1}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" }));
            }}
          />
          <Input
            placeholder="Amount"
            type="number"
            value={amount || ""}
            min={1}
            onChange={(e) => {
              const value = e.target.value;
              setAmount(value === "" ? null : Number(value));
              setErrors((prev) => ({ ...prev, amount: "" }));
            }}
          />
          <Input
            placeholder="Category"
            minLength={1}
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setErrors((prev) => ({ ...prev, category: "" }));
            }}
          />
          <Input
            placeholder="Date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: "" }));
            }}
          />
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Button className={styles.submit} type="submit">
            {type === "add" ? "Add Expense" : "Update Expense"}
          </Button>
          <Button
            className={styles.cancel}
            type="button"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </form>
      </Card>
    </Modal>
  );
};

export default UpdateExpense;
