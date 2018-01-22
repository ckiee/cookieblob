const {Client, Message, MessageEmbed}  = require("discord.js");
const cookieblob = require("../cookieblob");
const request = require("request");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let m = await msg.channel.send(new MessageEmbed().setDescription("<a:loadingrolling:393744853684584448>"));
        request("https://api.imgur.com/3/gallery/hot/viral/0.json", {
            headers: {
                Authorization: `Client-ID ${cookieblob.config.imgurClientID}`
            },
            json: true
        }, (err, response, body)=>{
            if (err) throw err;
            if (body.data.nsfw && !msg.channel.nsfw) return m.edit(":x: Cannot show NSFW memes in a non-nsfw channel.");
            m.edit(new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setTimestamp(new Date())
            .setFooter("Meme supplied by Imgur API")
            .setTitle(body.data.title)
            .setImage(body.data.images[0].link)
        );
        });
    },
    meta: {
        name: "meme",
        description: "Get a meme from Imgur.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}