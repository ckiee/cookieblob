const express = require("express");
const Cookieblob = require("../Cookieblob");
/**
 * 
 * @param {Cookieblob} cookieblob 
 * @returns a express router
 */
module.exports = async cookieblob => {
    const app = express.Router();
    const { r } = cookieblob; //db
    app.get("/", (req, res) => {
        res.json({success: "You found the API!"});
    });
    app.get("/bigdata/cmdUsages", async (req, res) => {
        res.json({success: true, data: await r.table("cmdusages").run()});
    });
    app.get("/bigdata/guildStats", async (req, res) => {
        res.json({success: true, data: await r.table("guildStats").pluck("count", "date").run()}); 
    });
    return app;
}