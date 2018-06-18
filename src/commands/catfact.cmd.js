const {
    Message
} = require("discord.js");
const request = require("snekfetch");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        const res = await request.get("https://catfact.ninja/fact").send();
        await msg.channel.send(`:ok_hand: Fact: *${res.body.fact}*`);
    },
    name: "catfact",
    description: "Show a random cat fact!",
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}