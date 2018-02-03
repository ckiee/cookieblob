const music = require("../music");
const {Message, Client} = require("discord.js");
module.exports = {
    /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let mg = music.getMusicGuild(msg.guild.id);
        if (!mg.playing) return msg.channel.send(":x: There is nothing to skip!");
        msg.channel.send(`:ok_hand: Skipped${mg.queue[0]!=null?`, now playing: \`${mg.queue[0].youtube.title}\``:"."}`);
        mg.getDispatcher().end();
    },
    meta: {
        name: "skip",
        description: "🎵 Skip the currently playing music.",
        usage: [],
        permissionLevel:0,
        guildOnly:true
    }
}