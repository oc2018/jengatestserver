import express from "express";
import {
  createProperty,
  getProperties,
  getProperty,
} from "../controllers/properties.controller.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getProperty);
router.post("/", createProperty);

export default router;
