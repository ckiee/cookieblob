const {
    Message,
    MessageAttachment
} = require(`discord.js`);
const qr = require(`qr-image`);
const Util = require(`../Util`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 1) return Util.sendInvalidUsage(cookieblob.commands.get(`qr`), msg);
        const req = args.join(` `);
        if (req.length > 300) return await msg.channel.send(`Your request must be up to 300 characters long.`);
        return await msg.channel.send(new MessageAttachment(qr.image(req, {
            type: `png`
        })));
    },
    name: `qr`,
    description: `Make a QR Code.`,
    usage: [`text`],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}