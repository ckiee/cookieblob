// Loader file for Cookieblob
const Config = require("./src/Config");
const ConfigInstance = new Config(require("./config"));
const r = require('rethinkdbdash')({db: process.env.db || "cookieblob"}); // Connect to RethinkDB
const Cookieblob = require("./src/Cookieblob");
const CookieblobInstance = module.exports = new Cookieblob(r, ConfigInstance);
const Death = require("death");
CookieblobInstance.login(ConfigInstance.discordToken);
if (CookieblobInstance.isDevelopment()) CookieblobInstance.on('debug', console.log);
else if (!CookieblobInstance.isDevelopment() && !CookieblobInstance.isProduction()) 
    console.log("\n\n*** No enviroment detected, you should set the NODE_ENV variable to 'production' or 'development'. ***\n\n");
let web;
CookieblobInstance.once("ready", async () => {
    web = await require("./src/web/web")(CookieblobInstance);
});
// If we die (Process killed)
Death(signal => {
    console.log("\n\nCleaning up before shutting down...");
    CookieblobInstance.musicGuilds.forEach(mg => {
        if (mg.dispatcher) {
            mg.dispatcher.removeAllListeners("end");
            mg.dispatcher.end();
            delete mg.dispatcher;
        }
        if (mg.voiceChannel) mg.voiceChannel.leave();
        delete mg;
    });
    if (web && web.listening) {
        console.log("Stopping web server...");
        web.httpServer.close();
    }

    process.exit(signal);
});