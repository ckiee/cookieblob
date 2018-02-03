const {Client, Message, MessageEmbed}  = require("discord.js");
const request = require("request");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let m = await msg.channel.send(new MessageEmbed().setDescription("<a:loadingrolling:393744853684584448>"));
        request.get("https://yesno.wtf/api/", {
            json:true,
        }, async (error, response, body) => {
            await m.edit(new MessageEmbed().setAuthor(msg.author.tag, msg.author.displayAvatarURL()).setColor(0xadf442)
            .setImage(body.image).setTitle(body.answer).setTimestamp(new Date()).setFooter("Supplied by https://yesno.wtf/"));
        });
    },
    meta: {
        name: "yesno",
        description: "Yes, or No?",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}