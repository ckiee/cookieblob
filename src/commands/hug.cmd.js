const {Message} = require("discord.js");
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
        if (!msg.mentions.members.first()) return Util.sendInvalidUsage(cookieblob.commands.get("hug"), msg);
        msg.channel.send(`*${msg.author.tag} hugs ${msg.mentions.users.first().tag}!* ❤ ${msg.mentions.users.first().id==cookieblob.user.id ? "Yay!" : ""}`);
    },
    name: "hug",
    description: "Hug a user! Lovely.",
    usage: ["user mention"],
    permissionLevel: Permissions.everyone,
    guildOnly:true
}