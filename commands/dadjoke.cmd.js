const {Client, Message, MessageEmbed}  = require("discord.js");
const request = require("request");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        request.get("https://icanhazdadjoke.com/", {
            json:true,
            headers: {
                Accept:"text/plain"
            }
        }, (error, response, body) => {
            let m = await msg.channel.send(new MessageEmbed().setDescription("<a:loadingrolling:393744853684584448>"));
            await m.edit(new MessageEmbed().setAuthor(msg.author.tag, msg.author.displayAvatarURL()).setColor(0xadf442).setDescription(`\`${body}\``).setTitle("Dad Joke"));
        });
    },
    meta: {
        name: "dadjoke",
        description: "Get a random dad joke.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}