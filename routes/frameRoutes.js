import express from "express";
import { createFrame, getAllFrames } from "../controllers/frameController.js";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, authorizeRole("admin"), createFrame);
router.get("/all", isAuthenticated, getAllFrames);

export default router;
