const {Client, Message, MessageAttachment}  = require("discord.js");
const qr = require("qr-image");
const Util = require("../Util");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 1) return Util.sendInvalidUsage(cookieblob.commands.get("qr"), msg);
        msg.channel.send(new MessageAttachment(qr.image(args.join(" "), {type:"png"})));
    },
    name: "qr",
    description: "Make a QR Code.",
    usage: ["text"],
    permissionLevel: Permissions.everyone,
    guildOnly:false
    
}