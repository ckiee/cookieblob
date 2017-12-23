const express = require("express");
const app = require("./site").app;
let oauthguard = require("./oauthguard");
let router = express.Router();
oauthguard.router.use("/admin", router);
router.get("/", (req, res)=>{
    res.render("admin/index");
});