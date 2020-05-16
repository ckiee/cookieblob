import { Router } from "express";
import passport from "passport";

const app = Router();

app.get("/", passport.authenticate("discord"));
app.get(
    "/invite",
    passport.authenticate("discord", { scope: ["identify", "bot"] })
);
app.get("/callback", passport.authenticate("discord"), (req, res) => {
    const guildId = req.query.guild_id as string | undefined;
    res.redirect("/dashboard");
});

app.post("/logout", (req, res) => {
    req.logOut();
    res.sendStatus(200);
});

export default app;
