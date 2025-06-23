import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  login,
} from "../controllers/users.controller.js";
import auth from "../middleware/index.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.post("/signin", login);
router.post("/signup", createUser);
router.get("/:id", auth, getUser);

export default router;
