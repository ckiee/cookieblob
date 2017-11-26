import { RichEmbed } from "discord.js";
const cookieblob = require("./cookieblob");
/**
 * Generate a invalid usage embed
 * @param {String} properUsage 
 * @param {Message} msg
 * @returns {RichEmbed}
 */
function invalidUsageEmbed(msg,cmdName) {
    return new RichEmbed()
        .setColor(0xea2112)
        .setAuthor(msg.author.tag, msg.author.avatarURL)
        .setTitle("Invalid Usage!")
        .setDescription(`Invalid usage!
        Proper usage: \`${renderUsage(cmdName)}\``)
        .setFooter("Invalid usage error",cookieblob.client.user.avatarURL);
}
/**
 * Render a command's usage.
 * @param {String} cmdName
 * @returns {String} Rendered usage
 */
function renderUsage(cmdName) {
    let cmd = cookieblob.getCommand(cmdName);
    let ubu = `${cookieblob.config.prefix}${cmd.meta.name}`;
    cmd.meta.usage.forEach((v)=>{
        ubu+=` <${v}>`;
    });
    return ubu;
}
module.exports = {
    invalidUsageEmbed: invalidUsageEmbed,
    renderUsage: renderUsage
}