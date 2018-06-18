/** @module */
const Cookieblob = require("./Cookieblob");
const {
    GuildMember
} = require("discord.js");
/**
 * @param {Cookieblob} cookieblob 
 * @param {GuildMember} member
 */
module.exports = async (cookieblob, member) => {
    const mg = cookieblob.musicGuilds.get(member.guild.id);
    // leave if alone
    const vc = member.guild.voiceConnection;
    if (!vc) return;
    if (vc.channel.members.size == 1) {
        vc.disconnect();
        if (mg.voiceChannel.id == vc.channel.id) mg.currentlyPlaying = undefined;
    }

    // undo vote if left vc
    if (mg.skippers.has(member.user.id)) mg.skippers.delete(member.user.id);
    cookieblob.musicGuilds.set(member.guild.id, mg);
}