const express = require("express");
const app = require("./site").app;
const cookieblob = require("../cookieblob");
const r = require("rethinkdb");
let conn = cookieblob.rethinkConnection;
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
    let cmdusages = (await (await r.table("cmdusages").run(conn)).toArray());
    console.log(cmdusages);
    res.render("admin/index", {user: req.user, cookieblob: cookieblob});
});