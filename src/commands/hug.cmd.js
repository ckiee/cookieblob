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
        if (msg.mentions.members.first() == null) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "hug"));
        if (msg.author.id == msg.mentions.users.first().id) return msg.channel.send("Why are you hugging yourself?");
        msg.channel.send(`*${msg.author.tag} hugs ${msg.mentions.users.first().tag}!* ❤ ${msg.mentions.users.first().id==client.user.id ? "Yay!" : ""}`);
    },
    name: "hug",
    description: "Hug a user! Lovely.",
    usage: ["user mention"],
    permissionLevel: Permissions.everyone,
    guildOnly:true
}