import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "./types";
import { PAGE_SIZE } from "../../app/constants";

interface ExpenseState {
  expenses: Expense[];
  balance: number;
  search: string;
  currentPage: number;
  sortOrder: "asc" | "desc";
}

const initialState: ExpenseState = {
  expenses: [],
  balance: 0,
  search: "",
  currentPage: 1,
  sortOrder: "desc",
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    addExpense(state, action: PayloadAction<Expense>) {
      state.expenses.push(action.payload);
    },
    addBalance(state, action: PayloadAction<number>) {
      state.balance += action.payload;
    },
    updateExpense(state, action: PayloadAction<Expense>) {
      const index = state.expenses.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense(state, action: PayloadAction<string>) {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
      // Check if the current page is still valid
      const totalPages = Math.ceil(state.expenses.length / PAGE_SIZE);
      if (state.currentPage > totalPages) {
        state.currentPage = totalPages;
      }
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
      // state.currentPage = 1;
    },
  },
});

export const {
  addExpense,
  addBalance,
  updateExpense,
  deleteExpense,
  setSearch,
  setCurrentPage,
  setSortOrder,
} = expenseSlice.actions;
export default expenseSlice.reducer;
