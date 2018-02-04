const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
            /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "setstarboard"));
        if (args[0] == "delete" || args[0] == "'delete'"/*this gotta be idiotproof*/) {
            let gd = await datastorage.getGuildData(msg.guild.id);
            if (!gd.guildData.starboard) {
                msg.channel.send(":x: This setting is already unset!");
                return;
            }
            delete gd.guildData.starboard;
            await gd.updateToDB();
            msg.channel.send(":ok_hand: Unset starboard channel.");
        }
        let chanTar = msg.guild.channels.filter(v => v.type == "text").find("name",args.join(" "));
        if (chanTar == null) return msg.channel.send(":x: Invalid text channel name!");
        let gd = await datastorage.getGuildData(msg.guild.id);
        gd.guildData.starboard = chanTar.id;
        await gd.updateToDB();
        msg.channel.send(`:ok_hand: Updated starboard channel to '#${chanTar.name}'.`);
    },
    meta: {
        name: "setstarboard",
        description: "Set a channel as the starboard channel",
        usage: ["channel name OR 'delete' to unset."],
        permissionLevel:"guildAdmin",
        guildOnly:true
    }
}