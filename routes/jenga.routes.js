import express from "express";
import {
  getAccountBalance,
  getJengaToken,
  getRefreshToken,
} from "../controllers/jenga.controller.js";

const router = express.Router();

router.get("/token", getJengaToken);
router.post("/refreshtoken", getRefreshToken);
router.post("/balance", getAccountBalance);

export default router;
