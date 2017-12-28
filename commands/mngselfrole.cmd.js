const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
        /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        const INVALIDROLE = ":x: That role doesn't exist!";
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole"));
        let role = msg.guild.roles.find("name",args.slice(1).join(" "));
        if (role == null && msg.guild.roles.get(args[1]) != null) role = msg.guild.roles.get(args[1]);
        let gd = await datastorage.getGuildData(msg.guild.id);
        let isNone = gd.guildData.selfRoles == null;
        if (!isNone) isNone = gd.guildData.selfRoles.length == 0;
        switch (args[0]) {
            case "list":
            if (isNone) {
                msg.channel.send(":x: This guild doesn't have any self roles.");
                return;
            }
            let sxl = gd.guildData.selfRoles;
            msg.channel.send(`Showing all self-roles in Guild \`${msg.guild.name}\`:\n${sxl.map(v => `* ${msg.guild.roles.get(v.id)
                ?msg.guild.roles.get(v.id).name:v.id}${client.users.get(v.author)?` (Added by: ${client.users.get(v.author).tag})`:''}`).join("\n")}`)
            break;
            case "add":
            if (role == null) return msg.channel.send(INVALIDROLE);
            let ele = {id: role.id,author: msg.author.id};
            if (isNone) {
                gd.guildData.selfRoles = [ele];
            } else {
                if (gd.guildData.selfRoles.filter(v => v.id == ele.id).length != 0) return msg.channel.send(":x: That self-role already exists.");
                gd.guildData.selfRoles.push(ele);
            }
            await gd.updateToDB();
            msg.channel.send(`:ok_hand: Marked role \`${role.name}\` as a self-role.`);
            break;
            case "remove":
            if (role == null) return msg.channel.send(INVALIDROLE);
            if (isNone) {
                msg.channel.send(":x: No self-roles to remove!");
                return;
            }
            let srs = gd.guildData.selfRoles;
            let r = srs.filter(v => v.id == role.id)[0];
            if (r == null) {
                msg.channel.send(":x: That role is not a self-role!");
                return;
            }
            srs.splice(srs.indexOf(r), 1);
            gd.guildData.selfRoles = srs;
            await gd.updateToDB();
            msg.channel.send(`:ok_hand: Unmarked \`${role.name}\` as a self-role.`);
            break;

            default:
            msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole"));
            break;
        }
    },
    meta: {
        name: "mngselfrole",
        description: "Manage the guild's self roles.",
        usage: ["add/remove/list", "add:role/remove:role/list:none"],
        permissionLevel:"guildAdmin",
        guildOnly:true
    }
}