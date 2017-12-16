const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
        /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (!msg.guild.me.hasPermission("KICK_MEMBERS")) return msg.channel.send(":x: Cookieblob does not have the `Kick Members` permission.");
        if (args.length < 2) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "kick"));
        let user = msg.mentions.members.first();
        if (user == null) user = msg.guild.members.get(args[0]);
        if (user == null) return msg.channel.send(":x: Could not find any member by that id / mention");
        let reason = args.slice(1).join(" ");
        user.kick(`${msg.author.tag} - '${reason}'`);
        msg.channel.send(`:ok_hand: Kicked ${user.user.tag} for '${reason}'.`);
    },
    meta: {
        name: "kick",
        description: "Kick a user.",
        usage: ["member id/member mention", "reason"],
        permissionLevel:"modRole",
        guildOnly:true
    }
}