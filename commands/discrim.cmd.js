const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let discrim = args.length == 1 ? args[0] : msg.author.discriminator;
        await msg.channel.send(client.users.filter(user => user.discriminator == discrim).map(user => user.tag).join("\n"));
    },
    meta: {
        name: "discrim",
        description: "See other users with your discrim or another one.",
        usage: ["discrim (optional)"],
        permissionLevel:0,
        guildOnly:false
    }
}