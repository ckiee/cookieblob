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
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(":x: Cookieblob does not have the `Kick Members` permission.");
        if (args.length < 2) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "kick"));
        let user = msg.mentions.members.first();
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return msg.channel.send(":x: Could not find any member by that id / mention");
        let reason = args.slice(1).join(" ");
        user.kick(`${msg.author.tag} - '${reason}'`);
        msg.channel.send(`:ok_hand: Kicked ${user.user.tag} for '${reason}'.`);
    },
    name: "kick",
    description: "Kick a user.",
    usage: ["member id/member mention", "reason"],
    permissionLevel:"modRole",
    guildOnly:true
}