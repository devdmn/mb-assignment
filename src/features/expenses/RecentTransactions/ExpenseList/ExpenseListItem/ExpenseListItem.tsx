import React from "react";
import type { Expense } from "../../../types";
import styles from "./ExpenseListItem.module.css";
import Button from "../../../../../components/Button/Button";
import {
  XCircleIcon,
  PencilIcon,
  GiftIcon,
  CakeIcon,
  TruckIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { formatCurrency, formatDate } from "../../../../../app/utils";

type ExpenseListItemProps = {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
};

const buttonStyles = {
  delete: {
    "--btn-bg": "#FF3E3E",
    "--btn-color": "#ffffff",
  } as React.CSSProperties,
  edit: {
    "--btn-bg": "#F4BB4A",
    "--btn-color": "#ffffff",
  } as React.CSSProperties,
} as const;

const CategoryIcon: React.FC<{ category: string }> = ({ category }) => {
  switch (category) {
    case "Food":
      return <CakeIcon className={styles.categoryIcon} title={category} />;
    case "Entertainment":
      return <GiftIcon className={styles.categoryIcon} title={category} />;
    case "Travel":
      return <TruckIcon className={styles.categoryIcon} title={category} />;
    default:
      return <BanknotesIcon className={styles.categoryIcon} title={category} />;
  }
};

const ExpenseListItem: React.FC<ExpenseListItemProps> = ({
  expense,
  onEdit,
  onDelete,
}) => {
  const { id, name, date, amount, category } = expense;

  return (
    <div className={styles.item}>
      <div className={styles.icon}>
        <CategoryIcon category={category} />
      </div>
      <div className={styles.info}>
        <p className={styles.name} title={name}>
          {name}
        </p>
        <p className={styles.date} title={formatDate(date)}>
          {formatDate(date)}
        </p>
      </div>
      <div className={styles.amount}>{formatCurrency(amount)}</div>
      <Button
        onClick={() => onDelete(id)}
        variant="icon"
        style={buttonStyles.delete}
      >
        <XCircleIcon title="Delete Expense" />
      </Button>
      <Button
        onClick={() => onEdit(expense)}
        variant="icon"
        style={buttonStyles.edit}
      >
        <PencilIcon title="Edit Expense" />
      </Button>
    </div>
  );
};

export default ExpenseListItem;
