import express from "express";
import {
  getAccountBalance,
  getFullStatement,
  getJengaToken,
  getMiniStatement,
  getRefreshToken,
  sendMoneyMobile,
} from "../controllers/jenga.controller.js";

const router = express.Router();

router.get("/token", getJengaToken);
router.post("/refreshtoken", getRefreshToken);
router.post("/balance", getAccountBalance);
router.post("/ministatement", getMiniStatement);
router.post("/fullstatement", getFullStatement);
router.post("/sendmobile", sendMoneyMobile);

export default router;
