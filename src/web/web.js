const express = require(`express`);
const Cookieblob = require(`../Cookieblob`);
const session = require(`express-session`);
const fs = require(`fs`);
const Util = require(`../Util`);
const randomstring = require(`randomstring`);
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async cookieblob => {
    const app = express();
    const httpServer = require(`http`).createServer(app);
    app.use(require(`helmet`)());
    if (process.env.NODE_ENV == `production`) app.set(`view engine`, `loopback`);
    const port = process.env.PORT || 3000;
    app.set(`view engine`, `ejs`);
    httpServer.listen(port);
    console.log(`[web] will listen on port ${port}`);
    const lastCommit = await Util.getLastCommit();

    app.get(`/`, (req, res) => {
        res.render(`index`, {lastCommit});
    });

    app.get(`/invite`, (req, res) => {
        res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${cookieblob.user.id}&scope=bot&permissions=3173376`);
    });

    app.get(`/docs`, (req, res) => {
        res.render(`docs`, {
            title: `Docs`,
            commands: Array.from(cookieblob.commands.values()),
            Util,
            lastCommit,
            escapeHTML: require(`escape-html`)
        });
    });
    app.get(`/stats`, (req, res) => {
        res.render(`stats`, {
            title: `Stats`,
            lastCommit
        });
    });
    app.use(`/api`, await require(`./api`)(cookieblob));
    app.use(express.static(`static`));
    app.use((req, res) => {
        res.render(`404`, {
            title: `Error`,
            lastCommit
        });
    });
    app.use((err, req, res, next) => {
        res.status(500);
        console.error("Web req err", err);
        res.render(`error`, {
            error: `Something went wrong: ${err.message}`,
            title: "Error",
            lastCommit
        })
    });
    return {
        app,
        httpServer
    };
};

/** 
 * Gets the secret from the file if it exists, if it does not exist it`ll generate a new one.
 * @returns {Promise<String>}
 */
function getSecretFile() {
    return new Promise((resolve, reject) => {
        const fn = `secret.cookieblob`;
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