const cookieblob = require("../cookieblob");
const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "issue"));
        let issue = args.join(" ");
        let m = await client.guilds.get("344798017611759638").channels.get("382554148878548995")
        .send(`:tada: new issue! from ${msg.author.tag}(${msg.author.id}) content: \`${issue}\` `);
        msg.channel.send(`:ok_hand: Submitted issue, I've sent you a private message for instructions how to delete a issue.`);
        msg.author.send(`Use ${cookieblob.config.prefix}removeissue ${m.id} to delete the issue you just made in <#${msg.channel.id}>.`);
    },
    meta: {
        name: "issue",
        description: "Submit a issue!",
        usage: ["the issue"],
        permissionLevel:0,
        guildOnly:false
    }
}