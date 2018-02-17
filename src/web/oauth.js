const express = require("express");
const passport = require("passport");
const scopes = ["identify"];
const app = module.exports = new express.Router();
app.get("/", passport.authenticate("discord", { scope: scopes }), (req, res) => {
    res.redirect("/");
});

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new DiscordStrategy({
    clientID: cookieblob.user.id,
    clientSecret: cookieblob.config.discordSecret,
    callbackURL: cookieblob.config.callbackURL
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(()=>{
        return done(null, profile);
    });
}));
app.use(session({
    secret: await getSecretFile(),
    resave: false,
    saveUninitialized: false
}));


app.get("/callback",
    passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => res.redirect("/oauth/dashboard"));

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.get("/debug", (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    } else {
        // res.redirect("/oauth");
        res.send("test test test.");
    }
});
app.use((req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/oauth");
});

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