const express = require("express");
let app = express();
app.set('view engine', 'ejs');
app.get("/", (req, res)=>{
    res.render("index.ejs", {guildAmount:require("../cookieblob").client.guilds.size, cookieblob:require("../cookieblob")});
});
app.get("/docs", (req, res)=>{
    res.render("docs.ejs", {cookieblob:require("../cookieblob"), commands: Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin").filter(cx => cx.meta.permissionLevel != "botOwner")});
});
app.use(express.static("static"));
app.listen(8085, function() {
    console.log("Listening on port 8085");
});
module.exports = {
    app: app
}
let admin = require("./admin.js");