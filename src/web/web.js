const express = require("express");
const Cookieblob = require("../Cookieblob");
const session = require("express-session");
const fs = require("fs");
const randomstring = require("randomstring");
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async cookieblob => {
    const app = express();
    app.disable("x-powered-by");
    if (process.env.NODE_ENV == "production") app.set("view engine", "loopback");
    const port = process.env.PORT || 3000;
    app.set("view engine", "ejs");
    app.listen(port, () => {
        console.log(`[Web] Listening on port ${port}`);
    });

    app.get("/", (req, res) => {
        res.render("index");
    });
    
    app.get("/invite", (req, res) => {
        res.redirect("https://discordapp.com/oauth2/authorize?client_id=324874714646577152&scope=bot&permissions=3173376");
    });

    app.use(express.static("static"));
    app.use((req, res) => {
        res.render("error", {error:"404 Page not found."});
    });
    return app;
};

/** 
 * Gets the secret from the file if it exists, if it does not exist it'll generate a new one.
 * @returns {Promise<String>}
 */
function getSecretFile() {
    return new Promise((resolve, reject) => {
        const fn = "secret.cookieblob";
        fs.exists(fn, exists => {
            if (exists) {
                fs.readFile(fn, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            } else {
                const secret = randomstring.generate(500); // pretty long secret lol
                fs.writeFile(fn, secret, err => {
                    if (err) reject(err);
                    resolve(secret);
                });
            }
        });
    });
}
