const {
    Message
} = require("discord.js");
const Util = require("../Util");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (!msg.mentions.members.first()) return Util.sendInvalidUsage(cookieblob.commands.get("poke"), msg);
        if (msg.author.id == msg.mentions.users.first().id) return msg.channel.send("Why are you poking yourself?");
        await msg.channel.send(`*${msg.author.tag} poked ${msg.mentions.users.first().tag}!* ${msg.mentions.users.first().id==cookieblob.user.id ? "Ouch!" : ""}`);
    },
    name: "poke",
    description: "Poke a user!",
    usage: ["user mention"],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}