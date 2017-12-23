const cookieblob = require("../cookieblob");
const {MessageEmbed, Message, Client} = require("discord.js");
module.exports = {
    /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        if (!msg.guild.me.hasPermission("ADD_REACTIONS")) return msg.channel.send(":x: I need `Add Reactions` permissions for this! (So you can use my page system)");
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":x: I need `Manage Messages` permissions for this! (So I can remove your reactions for my page system!)");
        const abandonTime = 120000;//ms
        const cpp = 10; // commands per page
        const commands = Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin").filter(cx => cx.meta.permissionLevel != "botOwner");
        let currentPage = 0;
        const controlArrow = "▶";
        const backwardsArrow = "◀";
        let embed = new MessageEmbed()
        .setAuthor("Cookieblob command list - Page "+(currentPage+1),msg.author.avatarURL)
        .setColor(0xffc300)
        .setTimestamp(new Date());
        const xEmote = "❌";
    },
    meta: {
        name: "help",
        description: "Show the list of commands you are currently looking at!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}