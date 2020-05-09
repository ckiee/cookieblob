import { Router } from "express";
import passport from "passport";
import authRouter from "./auth";
const app = Router();

app.use("/auth", authRouter);

export default app;
