const {Client, Message}  = require("discord.js");
module.exports = {
                    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":x: Cookieblob does not have the `Manage Messages` permission.");
        if (args.length != 1) msg.channel.send(require("../util").invalidUsageEmbed(msg, "purge"));
        let count = parseInt(args[0]);
        if (!count || count > 100 || count < 2) msg.channel.send(require("../util").invalidUsageEmbed(msg, "purge"));
        let deleted = await msg.channel.bulkDelete(count);
        await msg.channel.send(`:ok_hand: Removed ${deleted.size} messages.`)
        client.setTimeout(async () => {await m.delete()}, 1000*20);
    },
    meta: {
        name: "purge",
        description: "Purge messages.",
        usage: ["amount up to 100"],
        permissionLevel:"modRole",
        guildOnly:true
    }
}