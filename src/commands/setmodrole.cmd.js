const {
    Message
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
const Util = require(`../Util`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 1) return await Util.sendInvalidUsage(cookieblob.commands.get(`setmodrole`), msg);
        const role = msg.guild.roles.find(`name`, args.join(` `));
        if (!role) return await msg.channel.send(`:x: I couldn't find that role.`);
        const {
            r
        } = cookieblob; // db
        await r.table(`guildData`).get(msg.guild.id).update({
            modRole: role.id
        }).run();
        await msg.channel.send(`:ok_hand: Updated mod role to \`${role.name}\`.`);
    },
    name: `setmodrole`,
    description: `Sets the guild's mod role.`,
    usage: [`mod role name`],
    permissionLevel: Permissions.guildAdmin,
    guildOnly: true
}