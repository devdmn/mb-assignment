import React, { useState } from "react";
import Card from "../../../../components/Card/Card";
import ExpenseListItem from "./ExpenseListItem/ExpenseListItem";
import styles from "./ExpenseList.module.css";
import Button from "../../../../components/Button/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  selectCurrentPage,
  selectPaginatedExpenses,
  selectTotalPages,
} from "../../expensesSelectors";
import type { Expense } from "../../types";
import { deleteExpense, setCurrentPage, updateExpense } from "../../expensesSlice";
import UpdateExpense from "../../UpdateExpense/UpdateExpense";

const buttonStyle = {
  "--btn-bg": "#F1F1F1",
  boxShadow: "0 4px 4px rgba(0, 0, 0, 0.3)",
} as React.CSSProperties;

const ExpenseList = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(selectPaginatedExpenses);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const currentPage = useAppSelector(selectCurrentPage);
  const totalPages = useAppSelector(selectTotalPages);
  const paginationDisabled = totalPages <= 1;
  const canGoPrev = currentPage > 1 && !paginationDisabled;
  const canGoNext = currentPage < totalPages && !paginationDisabled;

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteExpense(id));
  };

  const handleUpdate = (expense: Expense) => {
    dispatch(updateExpense(expense));
    setEditingExpense(null);
  };

  const handlePrevious = () => {
    if (canGoPrev) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <>
      <Card>
        <ul className={styles.list}>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <li key={expense.id}>
                <ExpenseListItem
                  expense={expense}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </li>
            ))
          ) : (
            <li className={styles.empty}>No expense data available</li>
          )}
        </ul>
        <div className={styles.pagination}>
          <Button
            variant="icon"
            className={!canGoPrev ? styles.disabled : ""}
            style={buttonStyle}
            onClick={handlePrevious}
            disabled={!canGoPrev}
          >
            <ArrowLeftIcon title="Previous Page" />
          </Button>
          <span
            className={`${styles.page} ${
              paginationDisabled ? styles.disabled : ""
            }`}
          >
            {currentPage}
          </span>
          <Button
            variant="icon"
            className={!canGoNext ? styles.disabled : ""}
            style={buttonStyle}
            onClick={handleNext}
            disabled={!canGoNext}
          >
            <ArrowRightIcon title="Next Page" />
          </Button>
        </div>
      </Card>

      {editingExpense && (
        <UpdateExpense
          type="edit"
          data={editingExpense}
          submitHandler={handleUpdate}
          cancelHandler={() => setEditingExpense(null)}
        />
      )}
    </>
  );
};

export default ExpenseList;
