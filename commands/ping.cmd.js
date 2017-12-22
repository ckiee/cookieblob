const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let m = await msg.channel.send("Pong! :ping_pong:");
        m.edit(`<a:loadingrolling:393744853684584448> Pong! :ping_pong: (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~client.ping}ms)`);
    },
    meta: {
        name: "ping",
        description: "🏓",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}