const cookieblob = require("../cookieblob");
const RichEmbed = require("discord.js").RichEmbed;
module.exports = {
    run: async (msg, args, client) => {
        let embed = new RichEmbed()
            .setAuthor(msg.author.tag,msg.author.avatarURL)
            .setColor(0xffc300)
            .setTitle("***Cookieblob command list***")
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
        permissionLevel:0
    }
}