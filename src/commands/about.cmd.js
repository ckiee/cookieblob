const { MessageEmbed, Message } = require("discord.js");
const github_emote = "<:github:384690138749468682>";
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        await msg.channel.send(new MessageEmbed()
        .setColor(0xffc300)
        .setAuthor("Cookieblob",cookieblob.user.avatarURL())
        .setTimestamp(new Date())
        .setFooter("This bot is owned by RONTheCookie#7386 & Jellz#9453.",'https://cdn.discordapp.com/icons/344028874906009612/8d52c38d099e96ea0898b15566d13134.webp')
        .addField("Let's help you get started!",`Type ${cookieblob.config.defaultPrefix}help to see a list of commands!
Good luck 😃`)
        .addField("Want to invite me?","Click [here](https://discordapp.com/oauth2/authorize?client_id=324874714646577152&scope=bot&permissions=3173376)!")
        .addField("Need some help? Wanna chill?", "[Join the official Cookieblob support server!](https://discord.gg/ubPbX98)", true)
        .addField("Learn more?",
`[${github_emote} Github](https://github.com/ronthecookie/cookieblob)`)
    );
    },
    name: "about",
    description: "Some info about Cookieblob.",
    usage: [],
    permissionLevel:Permissions.everyone,
    guildOnly:false
}