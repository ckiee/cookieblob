const cookieblob = require("../cookieblob");
const MessageEmbed = require("discord.js").MessageEmbed;
module.exports = {
    run: async (msg, args, client) => {
        let embed = new MessageEmbed()
            .setAuthor("Cookieblob command list",msg.author.avatarURL)
            .setColor(0xffc300)
            .setTimestamp(new Date())
        Object.keys(cookieblob.commands).forEach( key => {
            let cmd = cookieblob.getCommand(key);
            embed.addField(key,`Description: \`${cmd.meta.description}\` 
Usage: \`${require("../util").renderUsage(key)}\``);
        });
        msg.channel.send(embed);
    },
    meta: {
        name: "help",
        description: "Show the list of commands you are currently looking at!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}