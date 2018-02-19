const {Message} = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (!mg.playing) return await msg.channel.send(":x: You don't seem to be playing any songs.");
        if (msg.member.voiceChannelID != mg.voiceChannel.id) return await msg.channel.send("You aren't in the music voice channel.");
        const vcMembers = mg.voiceChannel.members.size - 1;
        mg.skippers++;
        if ( (mg.skippers/vcMembers) >= 0.8) {
            if (mg.queue.length == 0) {
                mg.dispatcher.end();
                mg.voiceChannel.leave();
            } else {
                mg.dispatcher.end();
            }
            await msg.channel.send(":ok_hand: Skipped!");
        } else {
            await msg.channel.send(`:ok_hand: Voted to skip! You need ${Math.round(vcMembers - mg.skippers*0.8)} more people to skip.`);
        }
        cookieblob.musicGuilds.set(msg.guild.id, mg);
    }, 
    name: "skip",
    description: "Vote to skip a song.",
    usage: [],
    permissionLevel:Permissions.everyone,
    guildOnly:true
}