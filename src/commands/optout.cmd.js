const {Message}  = require("discord.js");
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
        if (args.length !== 1) return Util.sendInvalidUsage(cookieblob.commands.get("optout"), msg);
        const { r } = cookieblob;
        const optingFor = args[0].toLowerCase();
        if (optingFor === "musicdata") {
            const notice = await r.table("notices").get(`${msg.author.id}_musicdata`).run();
            if (!notice || notice.optout) {
                // opt in
                await r.table("notices").insert({id: `${msg.author.id}_musicdata`, optout: false}, {conflict: "update"}).run();
                await msg.channel.send(":ok_hand: Cookieblob will now collect data about the songs you play.");
            } else {
                // opt out
                await r.table("notices").get(`${msg.author.id}_musicdata`).update({optout: true}).run();
                await msg.channel.send(":ok_hand: Cookieblob will no longer collect data about the songs you play.");
            }
        } else {
            Util.sendInvalidUsage(cookieblob.commands.get("optout"), msg);
        }
    },
    name: "optout",
    description: "Opt out of cookieblob features.",
    usage: ["musicdata"],
    permissionLevel:Permissions.everyone,
    guildOnly:false
}