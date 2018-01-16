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
        let m = await client.guilds.get("392987506670305281").channels.get("392992243020988416")
        .send(`:tada: new issue! from ${msg.author.tag}(${msg.author.id}) content: \`${issue}\` Details: Guild: ${msg.guild.id}, channel: #${msg.channel.name} ${msg.channel.id}`);
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