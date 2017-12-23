const express = require("express");
const passport = require("passport");
const DiscordStrategy = require('passport-discord').Strategy;
const session = require("express-session");
const cookieblob = require("../cookieblob");
let app = require("./site").app;
let router = express.Router();
app.use("/oauthguard", router);
module.exports = {
    router: router
}
passport.serializeUser(function(user, done) {
    done(null, user);
  });
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
const scopes = ["identify"];  
passport.use(new DiscordStrategy({
    clientID: cookieblob.client.user.id,
    clientSecret: cookieblob.config.clientSecret,
    scope: scopes,
    callbackURL:"https://cookieblob.ronthecookie.me/oauthguard/callback"
},  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));
router.use(session({
    secret: cookieblob.config.secretRand,
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());
router.get('/', passport.authenticate('discord', { scope: scopes }), function(req, res) {
    res.redirect("/");
});
router.get('/callback',
passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/oauthguard/dashboard') }
);
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
router.use(function(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send("Not logged in!");
});
router.get("/test", (req,res)=>{
    res.send("Beep boop. You're logged in.");
});