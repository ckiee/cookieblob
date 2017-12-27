const datastorage = require("../datastorage");
const {Message, Client} = require("discord.js");
module.exports = {
        /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole"));
        let role = msg.guild.roles.find("name",args.slice(1).join(" "));
        let gd = await datastorage.getGuildData(msg.guild.id);
        await gd.updateFromDB(); // just incase
        let isNone = gd.guildData.selfRoles == null;
        if (!isNone) isNone = gd.guildData.selfRoles.length == 0;
        switch (args[0]) {
            case "list":
            if (isNone) {
                msg.channel.send(":x: This guild doesn't have any self roles.");
                return;
            }
            break;
            case "add":
            if (role == null) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole")); 
            let ele = {id: role.id,author: msg.author.id/*For future features, not using this atm.*/};
            if (isNone) {
                gd.guildData.selfRoles = [ele];
            } else {
                gd.guildData.selfRoles.push(ele);
            }
            await gd.updateToDB();
            msg.channel.send(`:ok_hand: Marked role \`${role.name}\` as a self-role.`);
            break;
            case "remove":
            if (role == null) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole")); 
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
            gd.guildData.selfRoles = srs.splice(srs.indexOf(r), 1);
            await gd.updateToDB();
            msg.channel.send(`:ok_hand: Unmarked \`${r.name}\` as a self-role.`);
            break;

            default:
            if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "mngselfrole"));
            break;
        }
    },
    meta: {
        name: "mngselfrole",
        description: "Manage the guild's self roles.",
        usage: ["add/remove/list", "add:rolename/remove:rolename/list:none"],
        permissionLevel:"botOwner",
        guildOnly:true
    }
}