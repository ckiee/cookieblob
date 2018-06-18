const {
    MessageEmbed,
    Message
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        await msg.channel.send(`We've disabled the help command, please view the documentation instead: https://cookieblob.ronthecookie.me/docs`);
    },
    name: `help`,
    description: `Use https://cookieblob.ronthecookie.me/docs instead.`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}