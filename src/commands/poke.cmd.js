const {Message, Client} = require("discord.js");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (msg.mentions.members.first() == null) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "poke"));
        if (msg.author.id == msg.mentions.users.first().id) return msg.channel.send("Why are you poking yourself?");
        msg.channel.send(`*${msg.author.tag} poked ${msg.mentions.users.first().tag}!* ${msg.mentions.users.first().id==client.user.id ? "Ouch!" : ""}`);
    },
    meta: {
        name: "poke",
        description: "Poke a user!",
        usage: ["user mention"],
        permissionLevel:0,
        guildOnly:true
    }
}