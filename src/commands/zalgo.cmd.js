const {Message} = require("discord.js");
const zalgo = require("to-zalgo");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (msg, args, client) => {
        await msg.channel.send(`Zalgoified: *\`${zalgo(args.join(" "))}\`*`);
    },
    meta: {
        name: "zalgo",
        description: "Convert normal text into zalgo text.",
        usage: [],
        permissionLevel:Permissions.everyone,
        guildOnly:false
    }
}