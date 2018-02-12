/** @module */
const Cookieblob = require("./Cookieblob");
const { GuildMember } = require("discord.js");
/**
 * @param {Cookieblob} cookieblob 
 * @param {GuildMember} member
 */
module.exports = async (cookieblob, member) => {
    const vc = member.guild.voiceConnection;
    if (!vc) return;
    if (vc.channel.members.size == 1) vc.disconnect();
}