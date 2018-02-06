const {Message} = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        await msg.channel.send(cookieblob.guilds.get("393781962545954817").emojis.random(1).toString());
    },
    name: "randomparrot",
    description: "Displays a random parrot animated emoji from http://cultofthepartyparrot.com",
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly:false
}