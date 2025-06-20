import express from "express";
import { getJengaToken } from "../controllers/jenga.controller.js";

const router = express.Router();

router.post("/token", getJengaToken);

export default router;
