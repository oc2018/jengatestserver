import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenses.controller.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;
