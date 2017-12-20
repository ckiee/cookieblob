const cookieblob = require("../cookieblob");
const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "removeissue"));
        let id = args[0];
        let d = await client.guilds.get("392987506670305281").channels.get("392992243020988416").messages.fetch(id);
        if (d == null) {
            msg.channel.send(":x: that issue does not exist.");
            return;
        }
        await d.delete("deleted by issue author");
        msg.channel.send(":ok_hand: deleted issue");
    },
    meta: {
        name: "removeissue",
        description: "Remove a issue!",
        usage: ["the issue id"],
        permissionLevel:0,
        guildOnly:false
    }
}