const {Client, Message, MessageAttachment}  = require("discord.js");
const qr = require("qr-image");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return require("../util").usage(msg);
        let c = args.join(" ");
        msg.channel.send(new MessageAttachment(qr.image(c, {type:"png"})));
    },
    meta: {
        name: "qr",
        description: "Make a QR Code.",
        usage: ["text"],
        permissionLevel:0,
        guildOnly:false
    }
}