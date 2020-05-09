import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";

const app = Router();

app.use("/auth", authRouter);
app.use("/users", userRouter);

// Serve 404 instead of index.html (in /index.ts)
app.use((_req, res) => {
    res.sendStatus(404);
});

export default app;
