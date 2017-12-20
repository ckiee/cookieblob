const cookieblob = require("../cookieblob");
const {MessageEmbed, Message, Client} = require("discord.js");
module.exports = {
    /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        let embed = new MessageEmbed()
            .setAuthor("Cookieblob command list",msg.author.avatarURL)
            .setColor(0xffc300)
            .setTimestamp(new Date())
        Object.keys(cookieblob.commands).forEach( key => {
            let cmd = cookieblob.getCommand(key);
            if (cmd.meta.permissionLevel == "botOwner" && msg.author.id != cookieblob.config.ownerID) return;
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