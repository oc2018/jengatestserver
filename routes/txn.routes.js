import express from "express";
import {
  createTxn,
  deleteTxn,
  getTxn,
  getTxns,
  updateTxn,
} from "../controllers/txns.controllers.js";

const router = express.Router();
router.get("/", getTxns);
router.get("/:id", getTxn);
router.post("/", createTxn);
router.patch("/:id", updateTxn);
router.delete("/:id", deleteTxn);

export default router;
