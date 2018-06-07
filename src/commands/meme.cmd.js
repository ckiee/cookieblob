const {Message, MessageEmbed}  = require("discord.js");
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
        const res = await request.get("https://api.imgur.com/3/gallery/hot/viral/0.json", 
        {headers: {Authorization: `Client-ID ${cookieblob.config.imgurClientID}`}})
        .send();
        if (res.body.data.nsfw && !msg.channel.nsfw) return m.edit(":x: The top imgur meme is currently marked as NSFW.");
        msg.channel.send("debug ",JSON.stringify(res.body).slice(0, 1700));
        m.edit(new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter("Meme supplied by Imgur API")
        .setTitle(res.body.data[0].title)
        .setImage(res.body.data[0].images[0].link)
        );
    },
    name: "meme",
    description: "Get the top viral meme from Imgur.",
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly:false
}