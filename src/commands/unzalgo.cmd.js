const {Client, Message}  = require("discord.js");
const banish = require("to-zalgo/banish");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let c = banish(args.join(" "));
        msg.channel.send(`Unzalgoified: *\`${c}\`*`);
    },
    meta: {
        name: "unzalgo",
        description: "Convert zalgo text into normal text.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}