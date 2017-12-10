const MessageEmbed = require("discord.js").MessageEmbed;
const config = require("../cookieblob").config;
const github_emote = "<:github:384690138749468682>";
module.exports = {
    run: async (msg, args, client) => {
        msg.channel.send(new MessageEmbed()
        .setColor(0xffc300)
        .setAuthor("Cookieblob",client.user.avatarURL)
        .setTimestamp(new Date())
        .setFooter("This bot is owned by RONTheCookie#7386.",client.users.get(config.ownerID).avatarURL)
        .addField("Let's help you get started!",`Type ${config.prefix}help to see a list of commands!
Good luck 😃`)
        .addField("Want to invite me?","Click [here](https://discordapp.com/oauth2/authorize?client_id=324874714646577152&scope=bot&permissions=3173376)!")
        .addField("Learn more?",
`[${github_emote} Github](https://github.com/ronthecookie/cookieblob)`)
    );
    },
    meta: {
        name: "about",
        description: "Some info about Cookieblob.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}