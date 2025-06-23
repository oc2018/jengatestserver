import express from "express";
import {
  createTenant,
  deleteTenant,
  getTenant,
  getTenants,
  updateTenant,
} from "../controllers/tenants.controller.js";

const router = express.Router();

router.get("/", getTenants);
router.get("/:id", getTenant);
router.post("/", createTenant);
router.patch("/:id", updateTenant);
router.delete("/:id", deleteTenant);

export default router;
