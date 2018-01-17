const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        const discrim = args.length == 1 ? parseInt(args[0]) : msg.author.discriminator;
        const users = client.users.filter(user => user.discriminator == discrim).map(user => user.tag);
        if (users.length == 0 || isNaN(discrim)) {
            await msg.channel.send(`:x: No results.`);
        } else {
            await msg.channel.send('```\n'+users.join("\n")+'\n```');
        }
    },
    meta: {
        name: "discrim",
        description: "See other users with your discrim or another one.",
        usage: ["discrim (optional)"],
        permissionLevel:0,
        guildOnly:false
    }
}