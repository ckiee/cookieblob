/** @module */
const Cookieblob = require("./Cookieblob");
const MusicGuild = require("./MusicGuild");
const { Message } = require("discord.js");
const Permissions = require("./Permissions");
const Util = require("./Util");
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
        if (!(await Permissions.checkGlobal(cookieblob, msg.author, cmd.permissionLevel)).result ) 
            return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to use this command.`);
        if (msg.guild) {
            // Guild permission checks
            if (Permissions.getPermissionType(cmd.permissionLevel) == "guild") {
                const gpr = await Permissions.checkGuild(cookieblob, msg.member, cmd.permissionLevel);
                if (!gpr.result) {
                    if (gpr.comment == "guildNoModrole")
                        return await msg.channel.send(`:x: Please set a mod role using \`${cookieblob.commands.get("setmodrole").formatCommand()}\`.`);
                    else
                        return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to run this command.`);
                }
            }
            // Make a music guild instance if it doesn't already exist
            if (!cookieblob.musicGuilds.has(msg.guild.id))
            cookieblob.musicGuilds.set(msg.guild.id, new MusicGuild(msg.guild.id, cookieblob));
            
            // Check to see if a database entry exists for this guild.
            const { r } = cookieblob; // db
            const origData = await r.table("guildData").get(msg.guild.id).run();
            const dgd = Util.getDefaultGuildData(msg.guild);
            if (!origData) await r.table("guildData").insert(dgd).run();
            else {
                // Remove properties original data already has and add new ones to the db if they don't exist.
                Object.keys(dgd).forEach(k => { 
                    if (origData[k]) delete dgd[k];
                });
                if (Object.keys(dgd).length == 0) return; // No need to update db if it's identical
                await r.table("guildData").get(msg.guild.id).update(Object.assign({}, origData, dgd)/*merge objs*/).run();
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