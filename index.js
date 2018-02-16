// Loader file for Cookieblob
if (!process.argv.includes("cbwebonly")) {
    const r = require('rethinkdbdash')(); // Connect to RethinkDB
    const Cookieblob = require("./src/Cookieblob");
    const Config = require("./src/Config");
    const ConfigInstance = new Config(require("./config"));
    const CookieblobInstance = module.exports = new Cookieblob(r, ConfigInstance);
    const Death = require("death");
    CookieblobInstance.login(ConfigInstance.discordToken);
    if (CookieblobInstance.isDevelopment()) CookieblobInstance.on('debug', console.log);
    else if (!CookieblobInstance.isDevelopment() && !CookieblobInstance.isProduction()) 
        console.log("\n\n*** No enviroment detected, you should set the NODE_ENV variable to 'production' or 'development'. ***\n\n");
    // If we die (Process killed)
    Death(() => {
        console.log("\n\nCleaning up before shutting down...");
        CookieblobInstance.musicGuilds.forEach(mg => {
            if (mg.dispatcher) mg.dispatcher.end();
            if (mg.voiceChannel) mg.voiceChannel.leave();
        });
        CookieblobInstance.destroy().then(process.exit);
    });
    require("./src/web/web");
} else {
    console.log("*** Running in web only mode. ***");
    // Load up web
    require("./src/web/web");
}