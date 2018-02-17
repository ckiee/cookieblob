const express = require("express");
const passport = require("passport");
const DiscordStrategy = require('passport-discord').Strategy;
const Cookieblob = require("../Cookieblob");
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = cookieblob => {
    const app = express();
    const port = process.env.PORT || 3000;
    app.set("view engine", "ejs");
    app.listen(port, () => {
        console.log(`[Web] Listening on port ${port}`);
    });
    app.get("/", (req, res) => {
        res.render("index");
    });
    
    app.get("/invite", (req, res) => {
        res.redirect("https://discordapp.com/oauth2/authorize?client_id=324874714646577152&scope=bot&permissions=3173376");
    });
    app.use(express.static("static"));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new DiscordStrategy({
        clientID: cookieblob.user.id,
        clientSecret: cookieblob.config.discordSecret,
        callbackURL: cookieblob.config.callbackURL
    }));
    app.use((req, res) => {
        res.render("error", {error:"404 Page not found."});
    });
};