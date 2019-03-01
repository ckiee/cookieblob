/** @module */
const Cookieblob = require(`./Cookieblob`);
const MusicGuild = require(`./MusicGuild`);
const {
    Message
} = require(`discord.js`);
const Permissions = require(`./Permissions`);
const Util = require(`./Util`);
/**
 * @param {Cookieblob} cookieblob 
 * @param {Message} msg
 */
module.exports = async (cookieblob, msg) => {
    try {
        if (msg.author.bot || !msg.content.startsWith(cookieblob.config.defaultPrefix)) return;
        const contentNoPrefix = msg.content.split(cookieblob.config.defaultPrefix).slice(1).join(cookieblob.config.defaultPrefix);
        const cmdLabel = contentNoPrefix.split(` `)[0];
        const contentNoCmd = contentNoPrefix.split(` `).slice(1);
        const args = contentNoPrefix.split(` `).slice(1);
        if (!cookieblob.commands.has(cmdLabel)) return;
        const cmd = cookieblob.commands.get(cmdLabel);
        if (!(await Permissions.checkGlobal(cookieblob, msg.author, cmd.permissionLevel)).result &&
            Permissions.getPermissionType(cmd.permissionLevel) == `global`) return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to use this command.`);

        // Guild-only checks.
        if (msg.guild) {
            // Guild permission checks
            if (Permissions.getPermissionType(cmd.permissionLevel) == `guild`) {
                const gpr = await Permissions.checkGuild(cookieblob, msg.member, cmd.permissionLevel);
                if (!gpr.result) {
                    if (cmd.permissionLevel == Permissions.guildMod && gpr.comment == `guildNoModrole`)
                        return await msg.channel.send(`:x: Please set a mod role using \`${cookieblob.commands.get(`setmodrole`).formatCommand()}\`.`);
                    else
                        return await msg.channel.send(`:x: You need the \`${cmd.formatPermissionLevel()}\` permission to run this command.`);
                }
            }
            // Make a music guild instance if it doesn`t already exist
            if (!cookieblob.musicGuilds.has(msg.guild.id)) cookieblob.musicGuilds.set(msg.guild.id, new MusicGuild(msg.guild.id, cookieblob));

            // Check to see if a database entry exists for this guild.
            const {
                r
            } = cookieblob; // db
            const origData = await r.table(`guildData`).get(msg.guild.id).run();
            const dgd = Util.getDefaultGuildData(msg.guild);
            if (!origData) await r.table(`guildData`).insert(dgd).run();
            else {
                // Remove properties original data already has and add new ones to the db if they don`t exist.
                Object.keys(dgd).forEach(k => {
                    if (origData[k]) delete dgd[k];
                });
                if (Object.keys(dgd).length != 0) { // No need to update db if it`s identical
                    await r.table(`guildData`).get(msg.guild.id).update(Object.assign({}, origData, dgd) /*merge objs*/ ).run();
                }
            }
        }
        // Finally run the command!
        await msg.channel.send(`:warning: Cookieblob is now discontinued and will remain active for some more time then shut down.
Please prepare by finding other bots to replace it.

I will run the command anyway in 10 seconds.`);
        await new Promise(resolve => {setTimeout(() => resolve(), 10000)}); 
        await cmd.run(cookieblob, msg, args);
        // This counts the amount of times a command has been used.
        (async () => {
            const {
                r
            } = cookieblob;
            const cmdStats = await r.table(`cmdusages`).get(cmd.name).run();
            if (!cmdStats) await r.table(`cmdusages`).insert({
                id: cmd.name,
                count: 1
            }).run();
            else {
                cmdStats.count++;
                await r.table(`cmdusages`).get(cmd.name).update(cmdStats).run();
            }
        })();
        // This sends soft alerts
        // DB Schema: https://i.ronthecookie.me/Ed91BUc.png
        // This also uses the `notices` table to not show duplicate softalerts to the same user.
        (async () => {
            const {
                r
            } = cookieblob;
            const softAlerts = await r.table(`softalerts`).run();
            for (const alert of softAlerts) {
                if (Math.random() >= alert.coverage) continue;
                const noticeString = `${msg.author.id}.softalert.${alert.id}`;
                const uNotice = await r.table("notices").get(noticeString).run();
                if (!uNotice) {
                    await msg.channel.send(alert.content);
                    await r.table("notices").insert({id: `${noticeString}`}).run();
                    break;
                } else continue;
            }
        })();
    } catch (error) {
        await msg.channel.send(
            `There was an error while running that command: 
\`\`\`js
${error.stack}
\`\`\``
        );
        if (cookieblob.isDevelopment()) cookieblob.emit(`debug`, `Error while running a command.\n${error.stack}`);
    }
}