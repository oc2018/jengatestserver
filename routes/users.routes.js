import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  updateUser,
} from "../controllers/users.controller.js";
import auth from "../middleware/index.js";

const router = express.Router();

router.get("/", auth, getUsers);
router.get("/:id", auth, getUser);
router.post("/signin", login);
router.post("/signup", createUser);
router.patch("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export default router;
