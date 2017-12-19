const request = require("request");
const {MessageEmbed, Client, Message}  = require("discord.js");
module.exports = {
            /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        request("http://www.rrrather.com/botapi",(error, response, body)=>{
            if (error) {
                msg.channel.send(":x: there was an error while getting your choices.");
                throw error;
            }
            let j = JSON.parse(body);
            if (j.nsfw && !msg.channel.nsfw) {
                msg.channel.send(`:x: The random match we found was marked as NSFW, you must be in a NSFW channel to view those.`);
                return;
            }
            msg.channel.send(new MessageEmbed()
            .setColor(0xe2900b)
            .setAuthor(msg.author.username)
            .setTitle(j.title)
            .setURL(j.link)
            .setDescription(`\`Choice A\`: *${j.choicea}*
\`Choice B\`: *${j.choiceb}*`)
        );
        });
    },
    meta: {
        name: "wouldyourather",
        description: "What would you rather? Choice A or Choice B.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}