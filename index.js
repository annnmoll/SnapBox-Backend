import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import frameRoutes from "./routes/frameRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import connectDB from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/frames", frameRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
connectDB();
