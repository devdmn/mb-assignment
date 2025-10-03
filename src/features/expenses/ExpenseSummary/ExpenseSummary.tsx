import React, { Suspense, useState } from "react";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";
import styles from "./ExpenseSummary.module.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectExpensesByCategory,
  selectTotalBalance,
  selectTotalExpense,
} from "../expensesSelectors";
import type { Expense } from "../types";
import { addBalance, addExpense } from "../expensesSlice";
import { formatCurrency } from "../../../app/utils";

const ExpenseSummaryChart = React.lazy(
  () => import("./ExpenseSummaryChart/ExpenseSummaryChart")
);

const UpdateExpense = React.lazy(
  () => import("../UpdateExpense/UpdateExpense")
);
const UpdateBalance = React.lazy(
  () => import("../UpdateBalance/UpdateBalance")
);

const buttonStyles = {
  addIncome: {
    "--btn-bg": "linear-gradient(to right, #B3D953, #89E148)",
    "--btn-color": "#ffffff",
  } as React.CSSProperties,
  addExpense: {
    "--btn-bg": "linear-gradient(to right, #FE9393, #FF3939)",
    "--btn-color": "#ffffff",
  } as React.CSSProperties,
} as const;

const ExpenseSummary = () => {
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectTotalBalance);
  const expense = useAppSelector(selectTotalExpense);
  const categoryData = useAppSelector(selectExpensesByCategory);

  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);

  const handleAddExpense = (expense: Expense) => {
    dispatch(addExpense(expense));
    setShowAddExpense(false);
  };

  const handleAddIncome = (amount: number) => {
    dispatch(addBalance(amount));
    setShowAddIncome(false);
  };

  return (
    <>
      <Card className={styles.container}>
        <Card className={styles.section}>
          <h2 className={styles.title}>
            Wallet Balance:{" "}
            <span className={`${styles.value} ${styles.balance}`}>
              {formatCurrency(balance)}
            </span>
          </h2>
          <Button
            onClick={() => setShowAddIncome(true)}
            style={buttonStyles.addIncome}
          >
            <PlusIcon strokeWidth={4} className={styles.icon} /> Add Income
          </Button>
        </Card>
        <Card className={styles.section}>
          <h2 className={styles.title}>
            Expenses:{" "}
            <span className={`${styles.value} ${styles.expense}`}>
              {formatCurrency(expense)}
            </span>
          </h2>
          <Button
            onClick={() => setShowAddExpense(true)}
            style={buttonStyles.addExpense}
          >
            <PlusIcon strokeWidth={4} className={styles.icon} /> Add Expense
          </Button>
        </Card>
        <div className={styles.section} style={{ minHeight: "240px" }}>
          {categoryData.length > 0 ? (
            <Suspense
              fallback={<div className={styles.loading}>Loading...</div>}
            >
              <ExpenseSummaryChart data={categoryData} />
            </Suspense>
          ) : (
            <p className={styles.empty}>No expense data available</p>
          )}
        </div>
      </Card>
      {showAddExpense && (
        <Suspense fallback={null}>
          <UpdateExpense
            type="add"
            submitHandler={handleAddExpense}
            cancelHandler={() => setShowAddExpense(false)}
          />
        </Suspense>
      )}
      {showAddIncome && (
        <Suspense fallback={null}>
          <UpdateBalance
            submitHandler={handleAddIncome}
            cancelHandler={() => setShowAddIncome(false)}
          />
        </Suspense>
      )}
    </>
  );
};

export default ExpenseSummary;
