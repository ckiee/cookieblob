const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const Cookieblob = require("../Cookieblob");
app.set("view engine", "ejs");
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get("/", (req, res) => {
    res.render("index");
});
app.get("/bstats", (req, res) => {
    res.json({users: cookieblob.users.size, guilds: cookieblob.guilds.size, channels: cookieblob.channels.size, tag: cookieblob.user.tag, id: cookieblob.user.id});
});

app.get("/invite", (req, res) => {
    res.redirect("https://discordapp.com/oauth2/authorize?client_id=324874714646577152&scope=bot&permissions=3173376");
});
app.use(express.static("static"));


app.use((req, res) => {
    res.render("error", {error:"404 Page not found."});
});