import express from "express";
import {
  getAccountBalance,
  getFullStatement,
  getJengaToken,
  getMiniStatement,
  getRefreshToken,
  pesaLinkMobile,
  pesaLinkToBank,
  queryStatus,
  sendMoneyMobile,
} from "../controllers/jenga.controller.js";

const router = express.Router();

router.get("/token", getJengaToken);
router.post("/querystatus", queryStatus);
router.post("/refreshtoken", getRefreshToken);
router.post("/balance", getAccountBalance);
router.post("/ministatement", getMiniStatement);
router.post("/fullstatement", getFullStatement);
router.post("/sendmobile", sendMoneyMobile);
router.post("/pesalinkmobile", pesaLinkMobile);
router.post("/pesalinkacc", pesaLinkToBank);

export default router;
