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
        if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send(":x: Cookieblob does not have the `Ban Members` permission.");
        if (args.length < 2) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "ban"));
        let user = msg.mentions.members.first();
        if (user == null) user = msg.guild.members.get(args[0]);
        if (user == null) return msg.channel.send(":x: Could not find any member by that id / mention");
        let reason = args.slice(1).join(" ");
        user.ban(`${msg.author.tag} - '${reason}'`);
        msg.channel.send(`:ok_hand: Banned ${user.user.tag} for '${reason}'.`);
    },
    name: "ban",
    description: "Ban a user.",
    usage: ["member id/member mention", "reason"],
    permissionLevel:"modRole",
    guildOnly:true
}