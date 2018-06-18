const {
    MessageEmbed,
    Message
} = require("discord.js");
const Cookieblob = require("../Cookieblob");
const Util = require("../Util");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 2) return await Util.sendInvalidUsage(cookieblob.commands.get("mngselfrole"), msg);
        const {
            r
        } = cookieblob;
        const role = msg.guild.roles.find("name", args.slice(1).join(" "));
        if (!role) return await msg.channel.send(":x: I couldn't find that role!");
        let gd = await r.table("guildData").get(msg.guild.id).run();
        if (args[0] == "add") {
            if (gd.selfRoles.includes(role.id)) return await msg.channel.send(":x: That role is already marked.");
            gd.selfRoles.push({
                id: role.id,
                author: msg.author.id
            });
            await r.table("guildData").get(msg.guild.id).update(gd).run();
            await msg.channel.send(`:ok_hand: Marked \`${role.name}\` as a self-role.`);
        } else if (args[0] == "remove") {
            if (!gd.selfRoles.includes(role.id)) return await msg.channel.send(":x: That role isn't already marked.");
            delete gd.selfRoles[gd.selfRoles.indexOf(role.id)];
            await r.table("guildData").get(msg.guild.id).update(gd).run();
            await msg.channel.send(`:ok_hand: Unmarked \`${role.name}\`.`);
        } else await Util.sendInvalidUsage(cookieblob.commands.get("mngselfrole"), msg);
    },
    name: "mngselfrole",
    description: "Manage the guild's self roles.",
    usage: ["add/remove", "role"],
    permissionLevel: Permissions.guildAdmin,
    guildOnly: true
}