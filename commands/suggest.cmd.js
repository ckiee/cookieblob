const cookieblob = require("../cookieblob");
const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "suggest"));
        let suggestion = args.join(" ");
        let m = await client.guilds.get("392987506670305281").channels.get("393971596177702922")
        .send(`:tada: new suggestion! from ${msg.author.tag} (${msg.author.id}) content: \`${suggestion}\` `);
        msg.channel.send(`:ok_hand: Submitted suggestion: \`${suggestion}\` Your feedback is greatly appreciated!`);
    },
    meta: {
        name: "suggest",
        description: "Submit a suggestion to the devs!",
        usage: ["your amazing suggestion"],
        permissionLevel:0,
        guildOnly:false
    }
}