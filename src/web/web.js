const express = require("express");
const app = express();
const port = process.env.port || 3000;
app.set("view engine", "ejs");
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
app.get("/", (req, res) => {
    res.render("index");
});
app.use(express.static("static"));