const express = require("express");
const cookieblob = require("../cookieblob");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {serveClient: false});
app.set('view engine', 'ejs');
app.get("/", (req, res)=>{
    res.render("index.ejs", {guildAmount:cookieblob.client.guilds.size});
});
app.get("/docs", (req, res)=>{
    res.render("docs.ejs", {renderUsage: require("../util").renderUsage, commands: Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin").filter(cx => cx.meta.permissionLevel != "botOwner")});
});
app.get("/socket.io/socket.io.js", (req, res) => {
    res.sendFile(require("path").resolve("./cookieblob/node_modules/socket.io-client/dist/socket.io.js"));
});
app.use(express.static("static"));
app.listen(8085, function() {
    console.log("Listening on port 8085");
});
setInterval(() => {
    io.emit("guild count", cookieblob.client.guilds.size);
});
module.exports = {
    app: app
}
let admin = require("./admin.js");