import experess from "express";
import { uploadImage } from "../controllers/uploads.controller.js";
import uploadMiddleware from "../middleware/multer.middleware.js";

const router = experess.Router();
router.post("/", uploadMiddleware, uploadImage);
export default router;
