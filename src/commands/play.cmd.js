const { Message } = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Util = require("../Util"); 
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (args.length < 1) return await Util.sendInvalidUsage(cookieblob.commands.get("play"), msg);
        if (!msg.member.voiceChannel) return await msg.channel.send(":musical_note: Please join a voice channel to play a song.");
        mg.voiceChannel = msg.member.voiceChannel;
        mg.textChannel = msg.channel;
        const qe = await mg.search(args.join(" "), msg.member, cookieblob);
        if (!mg.playing) await mg.play();
        else await msg.channel.send(`:ok_hand: Added \`${qe.title}\` to the queue.`);
        cookieblob.musicGuilds.set(msg.guild.id, mg);
    },
    name: "play",
    description: "Play a song from YouTube.",
    usage: ["youtube song name"],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}