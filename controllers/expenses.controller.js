import Expense from "../models/expenses.model.js";

import {
  getById,
  getAll,
  createNew,
  updateById,
  deleteById,
} from "../utils/controller.helper.fxns.js";

export const getExpenses = getAll(Expense);

export const getExpense = getById(Expense);

export const createExpense = createNew(Expense);

export const updateExpense = updateById(Expense);

export const deleteExpense = deleteById(Expense);
