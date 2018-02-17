const express = require("express");
const passport = require("passport");
const scopes = ["identify"];
const app = module.exports = new express.Router();
app.get("/", passport.authenticate("discord", { scope: scopes }), (req, res) => {
    res.redirect("/");
});

app.get("/callback",
    passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => res.redirect("/oauth/dashboard"));

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.get("/debug", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        res.redirect("/oauth");
    }
});
app.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/oauth");
});