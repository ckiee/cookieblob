const {Client, Message}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) {
            msg.channel.send(require("../util").invalidUsageEmbed(msg, 'count'));
            return;
        }
        let count = parseInt(args[0]);
        if (count == null) {
            msg.channel.send(require("../util").invalidUsageEmbed(msg, 'count'));
            return;
        }
        if (count > 60 || count < 5) {
            msg.channel.send("Invalid number! Count cannot be bigger than 60 or smaller than 5.");
            return;
        }
        let initalCount = count;
        let m = await msg.channel.send(`:timer: ${count}.`);
        async function handle() {
            if (count < 1) {
                await m.edit(`:ok_hand: Your countdown to ${initalCount} has finished.`);
                msg.channel.send(`<@${msg.author.id}> ^`);
            } else {
                count--;
                await m.edit(`:timer: ${count}.`);
                setTimeout(handle, 1000);
            }
        }
        setTimeout(handle, 1000);
    },
    meta: {
        name: "count",
        description: "Counts down from a number.",
        usage: ["count from"],
        permissionLevel:0,
        guildOnly:false
    }
}