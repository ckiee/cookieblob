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
        if (!msg.guild.me.permissionsIn(msg.channel).has("MANAGE_MESSAGES")) return msg.channel.send(":x: Cookieblob does not have the `Manage Messages` permission.");
        if (args.length != 1) return await Util.sendInvalidUsage(cookieblob.commands.get("purge"), msg);
        const count = parseInt(args[0]) + 1;
        if (!count || count > 100 || count < 2) return await Util.sendInvalidUsage(cookieblob.commands.get("purge"), msg);
        const deleted = await msg.channel.bulkDelete(count);
        const m = await msg.channel.send(`:ok_hand: Removed ${deleted.size} messages.`)
        cookieblob.setTimeout(() => m.delete(), 1000*20);
    },
    name: "purge",
    description: "Purge messages.",
    usage: ["amount up to 100"],
    permissionLevel: Permissions.guildMod,
    guildOnly: true
}