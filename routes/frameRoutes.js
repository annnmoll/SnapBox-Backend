import express from "express";
import {
  createFrame,
  deleteFrame,
  getAllFrames,
  updateFrame,
} from "../controllers/frameController.js";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, authorizeRole("admin"), createFrame);
router.get("/all", isAuthenticated, getAllFrames);
router.delete(
  "/delete/:id",
  isAuthenticated,
  authorizeRole("admin"),
  deleteFrame
);

router.put("/update/:id", isAuthenticated, authorizeRole("admin"), updateFrame);

export default router;
