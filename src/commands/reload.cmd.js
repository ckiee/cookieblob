const { Message } = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Command = require("../Command");
const Permissions = require("../Permissions");
const Util = require("../Util");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        try {
            if (args.length != 1) return await Util.sendInvalidUsage(cookieblob.commands.get("reload"), msg);
            let cmdFn = `./${args[0]}.cmd.js`;
            const delResult = delete require.cache[require.resolve(cmdFn)];
            let cmd = new Command(require(cmdFn));
            cookieblob.commands.set(cmd.name, cmd);
            await msg.channel.send(`:ok_hand: (Re)loaded command \`${cmd.name}\`.`);
        } catch(error) {
            if (error.message.includes("Cannot find module")) return await msg.channel.send(":x: I coulden't find that command name!");
            throw error;
        }
    },
    name: "reload",
    description: "(Re)loads a command",
    usage: [],
    permissionLevel: Permissions.botOwner,
    guildOnly:false
}