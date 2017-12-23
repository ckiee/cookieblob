const express = require("express");
let app = express();
app.use(express.static("static"));
app.listen(8085, function() {
    console.log("Listening on port 8085");
});