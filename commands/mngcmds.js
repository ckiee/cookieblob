const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) {
            msg.channel.send(require("../util").invalidUsageEmbed(msg, 'mngcmds'));
            return;
        }
        switch (args[0]) {
            case "load":
            if (args.length != 2) return msg.channel.send(require("../util").invalidUsageEmbed(msg, 'mngcmds')); 
            let cmdModule = require("./"+args[1]+".cmd.js");
            if (cmdModule.meta == null) throw Error(`Command module ${cmdModule} did not export 'meta'`);
            if (typeof cmdModule.run != "function") throw Error(`Command module ${JSON.stringify(cmdModule)} did not export 'run' or did not export 'run' as type 'function'`);
            cookieblob.commands[cmdModule.meta.name] = cmdModule;
            console.log(`${msg.author.tag} loaded command ${cmdModule.meta.name}`);
            break;

            default:
            msg.channel.send(require("../util").invalidUsageEmbed(msg, 'mngcmds'));
            break;
        }
    },
    meta: {
        name: "mngcmds",
        description: "Manage commands.",
        usage: ["load/reload","load:name/reload:name"],
        permissionLevel:"botOwner",
        guildOnly:false
    }
}