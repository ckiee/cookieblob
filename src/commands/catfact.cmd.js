const {
    Message
} = require(`discord.js`);
const request = require(`snekfetch`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        await cookieblob.commands.get("random").run(cookieblob, msg, ["catfact"]);
        msg.channel.send(":warning: This usage of the command will be removed in the future, use `cb!random catfact` instead.");
    },
    name: `catfact`,
    description: `Show a random cat fact!`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}