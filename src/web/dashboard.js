const express = require(`express`);
const Cookieblob = require(`../Cookieblob`);
const Util = require(`../Util`);
const session = require("express-session");
const _ = require("lodash");
const snek = require("snekfetch");
const RethinkStore = require("session-rethinkdb")(session);
/**
* 
* @param {Cookieblob} cookieblob 
* @returns a express router
*/
module.exports = async cookieblob => {
    const UserAgent = `Cookieblob (https://cookieblob.ronthecookie.me)`;
    const userATCache = new Map(); // <String(access token), Object(user from dapi)>
    setInterval(() => {
        userATCache.clear();
    }, 3.6e+6); // clear the cache every hour
    const app = express.Router();
    const lastCommit = await Util.getLastCommit();
    const {
        r
    } = cookieblob; //db
    function loggedInMiddleware(req, res, next) {
        if (req.session.accessToken) next();
        else res.redirect("/dashboard/login");
    }
    async function addUserObj(req, res, next) {
        const at = req.session.accessToken;
        if (userATCache.has(at)) {
            req.user = userATCache.get(at);
            next();
            return;
        }
        const ress = await snek.get("https://discordapp.com/api/users/@me", {
        headers: {
            "User-Agent": UserAgent,
            Authorization: `Bearer ${at}`
        }
    });
    const rUser = ress.body;
    const rawGuilds = (await snek.get("https://discordapp.com/api/users/@me/guilds", {
    headers: {
        "User-Agent": UserAgent,
        Authorization: `Bearer ${at}`
    }
})).body;
    const guilds = rawGuilds.filter(g => g.owner).map(guild => {
        guild.iconURL = guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` :`https://cdn.discordapp.com/embed/avatars/4.png`;
        return guild;
    });;
    rUser.guilds = guilds;
    userATCache.set(at, rUser);
    req.user = rUser;
    next();
}

app.use(session({
    saveUninitialized: false,
    name: "cookieblob_session", 
    resave: false, 
    store: new RethinkStore(r, {}),
    secret: await Util.getWebSecret(), 
    cookie: {
        secure: cookieblob.isProduction(),
        maxAge: 5.962e+8
    }
}));

app.get(`/`, loggedInMiddleware, addUserObj, (req, res) => {
    res.redirect("/dashboard/guilds");
    // res.render("dashboard", {
    //     title: `Dashboard`,
    //     lastCommit,
    //     user: req.user
    // })
});
app.get(`/guilds`, loggedInMiddleware, addUserObj, (req, res) => {
    res.render("dashboard/guilds", {
        title: `Choose a Guild`,
        lastCommit,
        user: req.user
    })
});

app.get("/guild/:id", loggedInMiddleware, addUserObj, async (req, res, next) => {
    const guild = _.find(req.user.guilds, {id: req.params.id});
    if (!guild) return next(); // trigger global 404
    res.render("dashboard/guild", {
        title: guild.name,
        lastCommit,
        user: req.user
    });
});

app.get(`/login`, (req, res) => {
    res.redirect(
        `https://discordapp.com/api/oauth2/authorize?client_id=${cookieblob.user.id}&redirect_uri=${encodeURIComponent(cookieblob.config.hostURL+"dashboard/callback")}&response_type=code&scope=identify%20guilds`
    );
});
app.get(`/callback`, async (req, res) => {
    //thanks github.com/jellz (:
    if (!req.query.code) return res.sendStatus(400);
    const creds = Buffer.from(`${cookieblob.user.id}:${cookieblob.config.discordSecret}`).toString(`base64`);
    const dapiURL = `https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${encodeURIComponent(cookieblob.config.hostURL + `dashboard/callback`)}`;
    const ress = await snek.post(dapiURL, {
        headers: {
            Authorization: `Basic ${creds}`,
            "User-Agent": UserAgent,
            "Content-Type": `application/x-www-form-urlencoded`
        }
    }).send();
    const json = ress.body;
    if (json.error) return res.sendStatus(500);
    req.session.accessToken = json.access_token;
    res.redirect(`/dashboard/guilds`);
});

return app;
}