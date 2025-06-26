import express from "express";
import { getCallback } from "../controllers/callback.controller.js";

const router = express.Router();

router.get("/", getCallback);

export default router;
