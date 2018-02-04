/** @module */
const Command = require("./Command");
const { Message, MessageEmbed } = require("discord.js");
/**
 * Sends a dynamic invalid usage message.
 * @param {Command} command 
 * @param {Message} msg 
 * @returns {Message} the sent message
 */
module.exports.sendInvalidUsage = async (command, msg) => {
    return await msg.channel.send(
        new MessageEmbed()
        .setAuthor("Invalid Arguments!", msg.author.avatarURL())
        .setTimestamp(new Date())
        .setFooter("You tried to use a command in a invalid way.")
        .setDescription(`Eh, I don't understand what you meant, try running the command again with this format: \`${command.formatCommand()} `)
    );
}