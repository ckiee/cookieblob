const express = require("express");
const app = module.exports = new express.Router();
app.get("/", passport.authenticate("discord", { scope: scopes }), (req, res) => {
    res.redirect("/");
});

app.get("/callback",
    passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => res.redirect("/oauthguard/dashboard"));

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

app.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/oauthguard");
});