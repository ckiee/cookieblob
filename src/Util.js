/** @module */
const Command = require(`./Command`);
const child_proc = require("child_process");
const {
    Message,
    MessageEmbed,
    Guild
} = require(`discord.js`);
/**
 * Sends a dynamic invalid usage message.
 * @param {Command} command 
 * @param {Message} msg 
 * @returns {Promise<Message>} the sent message
 */
module.exports.sendInvalidUsage = async (command, msg) => {
    return await msg.channel.send(
        new MessageEmbed()
        .setAuthor(`Invalid Arguments!`, msg.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter(`You tried to use a command in a invalid way.`)
        .setDescription(`Eh, I don't understand what you meant, try running the command again with this format: \`${command.formatCommand()}\` `)
    );
}
/**
 * @param {Guild} guild
 * @returns {Object}
 */
module.exports.getDefaultGuildData = guild => {
    return {
        id: guild.id,
        selfRoles: [],
        modRole: null
    };
}

module.exports.getLastCommit = () => {
    const cmd = `git log -n 1 --pretty=format:"%H"`;
    child_proc.exec(cmd, (err, stdout, stderr) => {
        if (err || stderr) console.log("Error while getting last commit:", err, stderr);
        console.log("got last commit:", stdout);
    });
}
module.exports.getLastCommit();