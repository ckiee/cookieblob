const {
    Message,
    MessageEmbed
} = require("discord.js");
const request = require("snekfetch");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        const m = await msg.channel.send(new MessageEmbed().setDescription("<a:loadingrolling:393744853684584448>"));
        const res = await request.get("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "text/plain"
            }
        }).send();
        await m.edit(new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL())
            .setColor(0xadf442).setDescription(`\`${res.body}\``).setTitle("Dad Joke").setTimestamp(new Date())
            .setFooter("Supplied by https://icanhazdadjoke.com/")
        );
    },
    name: "dadjoke",
    description: "Get a random dad joke.",
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}