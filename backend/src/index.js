import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./routers/users-router.js";
import cookieParser from "cookie-parser";
import scanRouter from "./routers/scans-router.js";
import authRouter from "./routers/auth-router.js";
import adminRouter from "./routers/admin-router.js";
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use("/reports",express.static(path.join(process.cwd(), "reports")));

connectDB();

app.use("/user", userRouter);
app.use("/scan", scanRouter);
app.use("/auth", authRouter);
app.use("/admin",adminRouter);
app.get("/", (req, res) => {
  res.json({ message: "WebSheild Backend server is running" });
});

app.listen(port, () => {
  console.log("server is runing in 4000");
});
