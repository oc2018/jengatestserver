import express from "express";
import {
  createTenant,
  getTenant,
  getTenants,
} from "../controllers/tenants.controller.js";

const router = express.Router();

router.get("/", getTenants);
router.get("/:id", getTenant);
router.post("/", createTenant);

export default router;
