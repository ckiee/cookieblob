const {Client, Message}  = require("discord.js");
let countAmount = 0;
const maxCounts = 30; // should be able to handle that
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, 'count'));
        let count = parseInt(args[0]);
        if (count == null) return msg.channel.send(require("../util").invalidUsageEmbed(msg, 'count'));
        if (count > 60 || count < 5) {
            msg.channel.send("Invalid number! Count cannot be bigger than 60 or smaller than 5.");
            return;
        }
        if (countAmount >= maxCounts) {
            msg.channel.send(":x: There are too many global countdowns already running, Please try again later.");
            return;
        } else {
            countAmount++;
        }
        let initalCount = count;
        let m = await msg.channel.send(`:timer: ${count}.`);
        async function handle() {
            if (count < 1) {
                await m.edit(`:ok_hand: Your countdown to ${initalCount} has finished.`);
                msg.channel.send(`<@${msg.author.id}> ^`);
                countAmount--;
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