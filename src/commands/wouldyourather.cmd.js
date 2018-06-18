const request = require("snekfetch");
const {
    MessageEmbed,
    Message
} = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let res = await request.get("http://www.rrrather.com/botapi").send();
        if (res.body.nsfw && !msg.channel.nsfw)
            return cookieblob.commands.get("wouldyourather").run(cookieblob, msg, args);
        msg.channel.send(new MessageEmbed()
            .setColor(0xe2900b)
            .setAuthor(msg.author.username, msg.author.avatarURL())
            .setTitle(res.body.title)
            .setURL(res.body.link)
            .setDescription(`\`Choice A\`: *${res.body.choicea}*
\`Choice B\`: *${res.body.choiceb}*`)
        );
    },
    name: "wouldyourather",
    description: "What would you rather? Choice A or Choice B.",
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}