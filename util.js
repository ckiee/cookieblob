const MessageEmbed = require("discord.js").MessageEmbed;
const cookieblob = require("./cookieblob");
/**
 * Generate a invalid usage embed
 * @param {String} properUsage 
 * @param {Message} msg
 * @returns {MessageEmbed}
 */
function invalidUsageEmbed(msg,cmdName) {
    return new MessageEmbed()
        .setColor(0xea2112)
        .setAuthor(msg.author.tag, msg.author.avatarURL)
        .setTitle("Invalid Usage!")
        .setDescription(`Proper usage: \`${renderUsage(cmdName)}\``)
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

        /**
         * 
         * @param {String} str
         * @returns {String} 
         */
        function filter(str) {
            const r = "[REDACTED]";
            return str.split(cookieblob.config.botsdiscordpwToken).join(r).split(cookieblob.config.discordbotsorgToken).join(r).split(cookieblob.config.ytKey).join(r).split(cookieblob.config.token).join(r);
        } 
module.exports = {
    invalidUsageEmbed: invalidUsageEmbed,
    renderUsage: renderUsage,
    filter:filter
}