const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
        /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        const INVALIDROLE = ":x: That role doesn't exist!";
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "selfrole"));
        let gd = await datastorage.getGuildData(msg.guild.id);
        await gd.updateFromDB(); // just incase
        let isNone = gd.guildData.selfRoles == null;
        if (!isNone) isNone = gd.guildData.selfRoles.length == 0;
        if (isNone) {
            msg.channel.send(":x: This guild doesn't have any self-roles");
            return;
        }
        let role = msg.guild.roles.find("name",args.slice(1).join(" "));
        if (role == null && msg.guild.roles.get(args[1]) != null) role = msg.guild.roles.get(args[1]);
        let sxl = gd.guildData.selfRoles;
        switch (args[0]) {

            case "list":
            msg.channel.send(`Showing all self-roles in Guild \`${msg.guild.name}\`:\n${sxl.map(v => `* ${msg.guild.roles.get(v.id)
                ?msg.guild.roles.get(v.id).name:v.id}${client.users.get(v.author)?` (Added by: ${client.users.get(v.author).tag})`:''}`).join("\n")}`)
            break;
            
            case "give":
                if (role == null) return msg.channel.send(INVALIDROLE);
                let r = sxl.filter(v => v.id == role.id)[0];
                if (r == null) return msg.channel.send(":x: That role is not marked as a self-role.");
                if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(":x: Cookieblob needs the `Manage Roles` permission for this command to work");
                msg.member.addRole(role, `Self-role by ${client.users.get(r.author)?client.users.get(r.author).tag:r.author}`);
                msg.channel.send(`:ok_hand: Added self-role \`${role.name}\`.`);
                break;

            case "remove":
                if (role == null) return msg.channel.send(INVALIDROLE);
                let rX = sxl.filter(v => v.id == role.id)[0];
                if (rX == null) return msg.channel.send(":x: That role is not marked as a self-role.");
                if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send(":x: Cookieblob needs the `Manage Roles` permission for this command to work");
                if (msg.member.roles.get(role.id) == null) return msg.channel.send(":x: You don't have that role!");
                msg.member.removeRole(role, `Self-role by ${client.users.get(rX.author)?client.users.get(rX.author).tag:rX.author}`);
            break;

            default:
            msg.channel.send(require("../util").invalidUsageEmbed(msg, "selfrole"));
            break;
        }
    },
    meta: {
        name: "selfrole",
        description: "Give yourself a role.",
        usage: ["list/give/remove", "give:role/remove:role"],
        permissionLevel:0,
        guildOnly:true
    }
}