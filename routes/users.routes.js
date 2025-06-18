import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  login,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/:id", getUser);

export default router;
