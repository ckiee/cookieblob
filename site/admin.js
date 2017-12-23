const express = require("express");
const app = require("./site").app;
const cookieblob = require("../cookieblob");
let oauthguard = require("./oauthguard");
let router = express.Router();
oauthguard.router.use("/admin", router);
router.use(function(req, res, next) {
    if (!cookieblob.config.admins.includes(req.user.id)) {
        res.status(403).send("You have to be a cookieblob admin or higher to view this.");
        return;
    }
    next();
})
router.get("/", (req, res)=>{
    res.render("admin/index", {user: req.user, cookieblob: cookieblob});
});