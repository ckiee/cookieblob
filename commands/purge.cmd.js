module.exports = {
    run: async (msg, args, client) => {
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":x: Cookieblob does not have the `Manage Messages` permission.");
        if (args.length != 1) msg.channel.send(require("../util").invalidUsageEmbed(msg, "purge"));
        let count = parseInt(args[0]);
        if (count == null) msg.channel.send(require("../util").invalidUsageEmbed(msg, "purge"));
        let deleted = await msg.channel.bulkDelete(count);
        msg.channel.send(`:ok_hand: Removed ${deleted.size} messages.`).then(m => {
            m.delete(1000*30);
        });
    },
    meta: {
        name: "purge",
        description: "Purge messages.",
        usage: ["amount"],
        permissionLevel:"modRole",
        guildOnly:true
    }
}