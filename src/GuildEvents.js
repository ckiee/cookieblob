/** @module */
const Cookieblob = require(`./Cookieblob`);
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async (cookieblob) => {
    await cookieblob.user.setPresence({
        activity: {
            name: `over ${cookieblob.guilds.size} guilds | ${cookieblob.config.defaultPrefix}help`,
            type: `WATCHING`
        }
    });
    const {
        r
    } = cookieblob;
    await r.table(`guildStats`).insert({
        count: cookieblob.guilds.size,
        date: new Date().getTime()
    }).run();
}