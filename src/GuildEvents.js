/** @module */
const Cookieblob = require("./Cookieblob");
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async (cookieblob) => {
    await cookieblob.user.setPresence({ activity: {name: `over ${cookieblob.guilds.size} guilds.`, type: "WATCHING" } });
}