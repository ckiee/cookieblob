const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let v;
        let r = Math.random();
        if (r > 0.5) {
            v = "Heads";
        } else v = "Tails";
        await msg.channel.send(`The coin landed on *${v}*.`);
    },
    name: "flipcoin",
    description: "Flip a coin!",
    usage: [],
    permissionLevel:Permissions.everyone,
    guildOnly:false
}