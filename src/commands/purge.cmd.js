const {Message}  = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
const Util = require("../Util");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":x: Cookieblob does not have the `Manage Messages` permission.");
        if (args.length != 1) return Util.sendInvalidUsage(cookieblob.commands.get("purge"), msg);
        let count = parseInt(args[0]);
        if (!count || count > 100 || count < 2) return Util.sendInvalidUsage(cookieblob.commands.get("purge"), msg);
        let deleted = await msg.channel.bulkDelete(count);
        await msg.channel.send(`:ok_hand: Removed ${deleted.size} messages.`)
        client.setTimeout(async () => {await m.delete()}, 1000*20);
    },
    name: "purge",
    description: "Purge messages.",
    usage: ["amount up to 100"],
    permissionLevel:"modRole",
    guildOnly:true
}