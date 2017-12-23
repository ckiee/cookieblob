const express = require("express");
let app = express();
app.set('view engine', 'ejs');
app.get("/", (req, res)=>{
    res.render("index.ejs")
});
app.use(express.static("static"));
app.listen(8085, function() {
    console.log("Listening on port 8085");
});
module.exports = {
    app: app
}
let admin = require("./admin.js");