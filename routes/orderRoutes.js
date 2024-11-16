import express from "express";
import { createOrder, getAllOrders } from "../controllers/orderController.js";
import { authorizeRole, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/", isAuthenticated, createOrder);
router.get("/", isAuthenticated, authorizeRole(["admin"]), getAllOrders);

export default router;
