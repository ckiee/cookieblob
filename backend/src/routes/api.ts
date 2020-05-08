import { Router } from "express";
import passport from "passport";

const app = Router();

app.get("/auth", passport.authenticate("discord"));
app.get("/auth/callback", passport.authenticate("discord"), (req, res) => {
    res.sendStatus(200);
});

export default app;
