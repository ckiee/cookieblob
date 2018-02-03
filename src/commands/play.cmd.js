const music = require("../music");
const {Message, Client} = require("discord.js");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "play"));
        let vc = msg.member.voiceChannel;
        if (!vc) {
            msg.channel.send(":x: You are not in a voice channel!");
            return;
        }
        if (!vc.joinable && msg.guild.voiceConnection.channel.id != vc.id) {
            msg.channel.send(":x: Cookieblob does not have permission to join that voice channel!");
            return;
        }
        let mg = music.getMusicGuild(msg.guild.id);
        let satqr = await music.searchAddToQueue(msg, args.join(" "));
        if (!mg.playing) music.play(msg); else msg.channel.send(`:ok_hand: Added \`${satqr.title}\` to the queue.`);
    },
    meta: {
        name: "play",
        description: "🎵 Play some music!",
        usage: ["search query"],
        permissionLevel:0,
        guildOnly:true
    }
}