import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";

const app = Router();

app.use("/auth", authRouter);
app.use("/users", userRouter);

export default app;
