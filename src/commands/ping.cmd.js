const {Message}  = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let m = await msg.channel.send("Pong! <a:loadingrolling:393744853684584448>");
        m.edit(`Pong! <a:loadingrolling:393744853684584448> (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~cookieblob.ping}ms)`);
    },
    name: "ping",
    description: "🏓",
    usage: [],
    permissionLevel:Permissions.everyone,
    guildOnly:false
}