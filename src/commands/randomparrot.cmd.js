const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        await msg.channel.send(client.guilds.get("393781962545954817").emojis.random(1).toString());
    },
    meta: {
        name: "randomparrot",
        description: "Displays a random parrot animated emoji from http://cultofthepartyparrot.com",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}