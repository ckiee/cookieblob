/** @module */
const Cookieblob = require("./Cookieblob");
const { GuildMember } = require("discord.js");
/**
 * @param {Cookieblob} cookieblob 
 * @param {GuildMember} member
 */
module.exports = async (cookieblob, member) => {
    // leave if alone
    const vc = member.guild.voiceConnection;
    if (!vc) return;
    if (vc.channel.members.size == 1) vc.disconnect();

    // undo vote if left vc
    const mg = cookieblob.musicGuilds.get(member.guild.id);
    if (mg.skippers.has(member.user.id)) mg.skippers.delete(member.user.id);
    cookieblob.musicGuilds.set(member.guild.id, mg);
}