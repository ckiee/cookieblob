const music = require("../music");
const {Message, Client} = require("discord.js");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) msg.channel.send(require("../util").invalidUsageEmbed(msg, "play"));
        let mg = music.getMusicGuild(msg.guild.id);
        await music.searchAddToQueue(msg, args.join(" "));
        if (!mg.playing) music.play(msg);
    },
    meta: {
        name: "play",
        description: "🎵 Play some music!",
        usage: ["search query"],
        permissionLevel:0,
        guildOnly:true
    }
}