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
        if (mg == null) return msg.channel.send(":x: There is nothing to show!");
        if (!mg.playing) return msg.channel.send(":x: There is nothing to show!");
        let discordBlock = '```'
        let content = `${discordBlock}
Now playing: ${mg.getPlayingTitle()==""?"Unknown":mg.getPlayingTitle()}`;
        mg.queue.forEach((v, i)=>{
            content+=`\n${v.youtube.title}`;
        });
        content+=discordBlock;
        msg.channel.send(content);
    },
    meta: {
        name: "queue",
        description: "🎵 See all music in the queue.",
        usage: [],
        permissionLevel:0,
        guildOnly:true
    }
}