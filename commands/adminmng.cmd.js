const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
const r = require("rethinkdb");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return require("../util").usage(msg);
        switch (args[0]) {
            case "cmdload":
            if (args.length != 2) return msg.channel.send(require("../util").invalidUsageEmbed(msg, 'mngcmds')); 
            let cmdModule = require("./"+args[1]+".cmd.js");
            if (cmdModule.meta == null) throw Error(`Command module ${cmdModule} did not export 'meta'`);
            if (typeof cmdModule.run != "function") throw Error(`Command module ${JSON.stringify(cmdModule)} did not export 'run' or did not export 'run' as type 'function'`);
            cookieblob.commands[cmdModule.meta.name] = cmdModule;
            console.log(`${msg.author.tag} loaded command ${cmdModule.meta.name}`);
            msg.channel.send(`:ok_hand: loaded command ${cmdModule.meta.name}!`);
            break;

            case "cmdreload":
            let mPath = `./${args[1]}.cmd.js`;
            delete require.cache[require.resolve(mPath)];  
            let cmdModuleR = require(mPath);
            cookieblob.commands[cmdModuleR.meta.name] = cmdModuleR;
            console.log(`${msg.author.tag} reloaded command ${cmdModuleR.meta.name}`);
            msg.channel.send(`:ok_hand: reloaded command ${cmdModuleR.meta.name}!`);
            break;

            case "getguildstats":
            const c = cookieblob.rethinkConnection;
            const raw = await r.table("guildStats").getAll().run(c);
            console.log(raw);
            return;
            const filename = `cblob-guild-stats-${require("randomstring").generate(5)}.json`;
            require("fs").writeFile(`/home/ron/personalcdn/data/${filename}`,
        JSON.stringify(data), async err => {
            if (err) return await msg.channel.send(":x: there was an error while trying to store your guild stats data: " + err);
            await msg.channel.send(`:ok_hand: here's your data: https://i.ronthecookie.me/${filename}`);
        });
        
            break;


            default:
            require("../util").usage(msg);
            break;
        }
    },
    meta: {
        name: "adminmng",
        description: "Manage cookieblob (for developers!)",
        usage: ["cmdload/cmdreload/getguildstats","cmdload:name/cmdreload:name"],
        permissionLevel:"botAdmin",
        guildOnly:false
    }
}