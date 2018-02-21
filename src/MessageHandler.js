/** @module */
const Cookieblob = require("./Cookieblob");
const MusicGuild = require("./MusicGuild");
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
        if ((await Permissions.checkGlobal(cookieblob, msg.author, cmd.permissionLevel)).result ) 
            return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to use this command.`);
        if (msg.guild) {
            if (!cookieblob.musicGuilds.has(msg.guild.id))
                cookieblob.musicGuilds.set(msg.guild.id, new MusicGuild(msg.guild.id, cookieblob));
            if (Permissions.getPermissionType(cmd.permissionLevel) == "guild") {
                const gpr = await Permissions.checkGuild(cookieblob, msg.member, cmd.permissionLevel);
                if (!gpr.result) {
                    if (gpr.comment == "guildNoModrole")
                        return await msg.channel.send(`:x: Please set a mod role using \`${cookieblob.commands.get("setmodrole").formatCommand()}\`.`);
                    else
                        return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to run this command.`);
                }
            }
        }
        await cmd.run(cookieblob, msg, args);
    } catch (error) {
        await msg.channel.send(
`There was an error while running that command: 
\`\`\`js
${error.stack}
\`\`\``
    );
    if (cookieblob.isDevelopment()) cookieblob.emit("debug", `Error while running a command.\n${error.stack}`);
    }
}