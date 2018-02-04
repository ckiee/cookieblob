// Loader file for Cookieblob
const r = require('rethinkdbdash')(); // Connect to RethinkDB
const Cookieblob = require("./src/Cookieblob");
const Config = require("./src/Config");
const ConfigInstance = new Config(require("./config"));
const CookieblobInstance = module.exports = new Cookieblob(r, ConfigInstance);
const Death = require("death");
CookieblobInstance.login(ConfigInstance.discordToken);
if (process.env.NODE_ENV != "production") CookieblobInstance.on('debug', console.log);
// If we die (Process killed)
Death(() => {
    console.log("\n\nCleaning up before shutting down...");
    CookieblobInstance.destroy().then(process.exit);
});