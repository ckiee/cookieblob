const Util = require(`../Util`);
const {
    MessageEmbed,
    Message,
    Role,
    GuildMember
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 1) return await Util.sendInvalidUsage(cookieblob.commands.get(`selfrole`), msg);
        const {
            r
        } = cookieblob;
        const role = msg.guild.roles.find(`name`, args.slice(1).join(` `));
        const gd = await r.table(`guildData`).get(msg.guild.id).run();
        /**
         * @param {String} id
         * @returns {Boolean} 
         */
        function hasSelfrole(id) {
            let res = false;
            gd.selfRoles.forEach(v => {
                if (v.id == id) res = true;
            });
            return res;
        }
        async function doActionChecks() {
            if (args.length < 2) return await Util.sendInvalidUsage(cookieblob.commands.get(`selfrole`), msg);
            if (!role) return await msg.channel.send(`:x: I couldn't find that role!`);
            if (!hasSelfrole(role.id)) return await msg.channel.send(`:x: That role is not a self-role.`);
            if (!msg.guild.me.hasPermission(`MANAGE_ROLES`) ||
                msg.member.roles.highest.position > msg.guild.me.roles.highest.position)
                return await msg.channel.send(`:x: I don't have permission to give you a role.`);
        }
        if (args[0] == `list`) {
            function getRName(sr) {
                return msg.guild.roles.get(sr.id) ? msg.guild.roles.get(sr.id).name : `?????`;
            }

            function getAName(sr) {
                return cookieblob.users.get(sr.author) ? cookieblob.users.get(sr.author).tag : `?????`;
            }
            const resultsArr = gd.selfRoles.map(sr => `**${getRName(sr)}** added by **${getAName(sr)}**`);
            await msg.channel.send(new MessageEmbed()
                .setAuthor(msg.author.tag, msg.author.avatarURL())
                .setTimestamp(new Date())
                .setTitle(`List of Selfroles`)
                .setDescription(resultsArr.length != 0 ? resultsArr.join(`, `) : `I couldn't find any self-roles.`)
            );
        } else if (args[0] == `give`) {
            if (await doActionChecks()) return; // it returns a message if check didnt pass, otherwise returns nothing.
            await msg.member.roles.add(role.id);
            await msg.channel.send(`:ok_hand:`);
        } else if (args[0] == `remove`) {
            if (await doActionChecks()) return; // it returns a message if check didnt pass, otherwise returns nothing.
            if (!msg.member.roles.has(role.id)) return await msg.channel.send(`:x: You don't have this role.`);
            await msg.member.roles.remove(role.id);
            await msg.channel.send(`:ok_hand:`);
        } else await Util.sendInvalidUsage(cookieblob.commands.get(`selfrole`), msg);
    },
    name: `selfrole`,
    description: `Give yourself a role.`,
    usage: [`list/give/remove`, `role`],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}