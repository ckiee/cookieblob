const {
    Message
} = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Util = require("../Util");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 2) return await Util.sendInvalidUsage(cookieblob.commands.get("ban"), msg);
        let user = msg.mentions.members.first();
        if (!user) user = msg.guild.members.get(args[0]);
        if (!user) return await msg.channel.send(":x: Could not find any member by that id / mention");
        if (!user.bannable) return await msg.channel.send(":x: I cannot kick this user, this user is either the server owner or someone with a higher role then me.");
        const reason = args.slice(1).join(" ");
        await user.ban(`${msg.author.tag} - '${reason}'`);
        await msg.channel.send(`:ok_hand: Banned ${user.user.tag} for '${reason}'.`);
    },
    name: "ban",
    description: "Ban a user.",
    usage: ["member id/member mention", "reason"],
    permissionLevel: Permissions.guildMod,
    guildOnly: true
}