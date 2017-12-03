const datastorage = require("../datastorage");
module.exports = {
    run: async (msg, args, client) => {
        if (args.length < 1) return msg.channel.send(require("../util").invalidUsageEmbed(msg, "setmodrole"));
        let gd = datastorage.getGuildData(msg.guild.id);
        await gd.ready;
        let role = msg.guild.roles.find("name",args.join(" "));
        if (role == null) return msg.channel.send(":x: Invalid role!");
        gd.guildData.modRole = role.id;
        gd.updateToDB();
        msg.channel.send(`:ok_hand: Updated mod role to '${role.name}'.`);
    },
    meta: {
        name: "setmodrole",
        description: "Sets the guild's mod role.",
        usage: ["mod role name"],
        permissionLevel:"guildAdmin",
        guildOnly:true
    }
}