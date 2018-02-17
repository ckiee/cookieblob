const express = require("express");
const passport = require("passport");
const DiscordStrategy = require('passport-discord').Strategy;
const Cookieblob = require("../Cookieblob");
const session = require("express-session");
const fs = require("fs");
const randomstring = require("randomstring");
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async cookieblob => {
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


    app.use("/oauth", require("./oauth"));
    app.use(express.static("static"));
    app.use((req, res) => {
        res.render("error", {error:"404 Page not found."});
    });
    return app;
};