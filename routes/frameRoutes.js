import express from "express";
import { createFrame, getAllFrames } from "../controllers/frameController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, createFrame);
router.get("/all", getAllFrames);

export default router;
