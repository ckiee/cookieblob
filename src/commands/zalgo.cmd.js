const {Client, Message} = require("discord.js");
const zalgo = require("to-zalgo");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let c = zalgo(args.join(" "));
        msg.channel.send(`Zalgoified: *\`${c}\`*`);
    },
    meta: {
        name: "zalgo",
        description: "Convert normal text into zalgo text.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}