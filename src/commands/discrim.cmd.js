const {Client, Message, MessageEmbed} = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        const discrim = args.length == 1 ? args[0] : msg.author.discriminator;
        if (!(discrim.split("").every(v => !isNaN(parseInt(v))))) return await msg.channel.send(":x: A discriminator can only contain digits.");
        if (discrim.length != 4) return await msg.channel.send(":x: A discriminator is always 4 digits.");
        const users = client.users.filter(user => user.discriminator == discrim).map(user => user.tag).slice(0, 9);
        let embed = new MessageEmbed()
        .setTitle(`Users with #${discrim}`)
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setFooter("Limited to 10 users.")
        .setTimestamp(new Date())
        .setDescription(users.join("\n"));
        await msg.channel.send(embed);
    },  
    meta: {
        name: "discrim",
        description: "See other users with your discrim or another one.",
        usage: ["discrim (optional)"],
        permissionLevel:0,
        guildOnly:false
    }
}