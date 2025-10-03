import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import type { Expense } from "./types";
import { PAGE_SIZE } from "../../app/constants";

// Raw expenses
export const selectExpenses = (state: RootState): Expense[] =>
  state.expenses.expenses;

// Search term
export const selectSearch = (state: RootState): string => state.expenses.search;

// Filter by search
export const selectFilteredBySearch = createSelector(
  [selectExpenses, selectSearch],
  (expenses, search) => {
    if (!search) return expenses;
    const query = search.toLowerCase();
    return expenses.filter(
      (exp) =>
        exp.name.toLowerCase().includes(query) ||
        String(exp.amount).includes(query) ||
        exp.category.toLowerCase().includes(query)
    );
  }
);

// Sort Order
export const selectSortOrder = (state: RootState): "asc" | "desc" =>
  state.expenses.sortOrder;

// Sorted by newest first
export const selectSortedExpenses = createSelector(
  [selectFilteredBySearch, selectSortOrder],
  (expenses, sortOrder) =>
    [...expenses].sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    )
);

// Current page
export const selectCurrentPage = (state: RootState): number =>
  state.expenses.currentPage;

// Total count for pagination
export const selectTotalCount = (state: RootState): number =>
  selectSortedExpenses(state).length;

// Total pages
export const selectTotalPages = (state: RootState): number => {
  const totalCount = selectTotalCount(state);
  return Math.ceil(totalCount / PAGE_SIZE);
};

// Paginated list
export const selectPaginatedExpenses = createSelector(
  [selectSortedExpenses, selectCurrentPage],
  (sorted, currentPage) => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }
);

// Summary by category (for chart)
export const selectExpensesByCategory = createSelector(
  [selectExpenses],
  (expenses) => {
    const combined = expenses.reduce((acc: Record<string, number>, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});
    return Object.entries(combined).map(([name, value]) => ({ name, value }));
  }
);
// Total expenses amount
export const selectTotalExpense = (state: RootState): number =>
  selectExpenses(state).reduce((sum, exp) => sum + exp.amount, 0);

// Total balance
export const selectTotalBalance = (state: RootState): number =>
  state.expenses.balance - selectTotalExpense(state);
