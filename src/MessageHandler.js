/** @module */
const Cookieblob = require("./Cookieblob");
const { Message } = require("discord.js");
const Permissions = require("./Permissions");
/**
 * @param {Cookieblob} cookieblob 
 * @param {Message} msg
 */
module.exports = async (cookieblob, msg) => {
    try {
        if (msg.author.bot || !msg.content.startsWith(cookieblob.config.defaultPrefix)) return;
        const contentNoPrefix = msg.content.split(cookieblob.config.defaultPrefix).slice(1).join(cookieblob.config.defaultPrefix);
        const cmdLabel = contentNoPrefix.split(" ")[0];
        const contentNoCmd = contentNoPrefix.split(" ").slice(1);
        const args = contentNoPrefix.split(" ").slice(1);
        if (!cookieblob.commands.has(cmdLabel)) return;  
        const cmd = cookieblob.commands.get(cmdLabel);
        if (!Permissions.checkGlobal(cookieblob, msg.author, cmd.permissionLevel)) 
            return await msg.channel.send(`:x: You need the \`${cmd.permissionLevel.toString()}\` permission to use this command.`);
        cmd.run.call(cookieblob, [args, msg]);
    } catch (error) {
        
    }
}