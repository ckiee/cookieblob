/** @module */
const Command = require(`./Command`);
const child_proc = require("child_process");
const fs = require("mz/fs");
const randomstring = require("randomstring");
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

let lastCommit;

/**
 * @returns {Promise<String>} Last commit hash
 */
module.exports.getLastCommit = () => {
    return new Promise((resolve, reject) => {
        if (lastCommit) resolve(lastCommit);
        const cmd = `git log -n 1 --pretty=format:"%H"`;
        child_proc.exec(cmd, (err, stdout, stderr) => {
            if (err) reject(err);
            if (stderr) reject("External git err " + err);
            lastCommit = stdout;
            resolve(stdout);
        });
    });
}

module.exports.getWebSecret = async () => {
    if (await fs.exists("cb.secret")) return await fs.readFile("cb.secret").toString();
    else {
        secret = randomstring.generate(500);
        await fs.writeFile("cb.secret", secret);
        return secret;
    }
};