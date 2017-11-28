const datastorage = require("../datastorage");
module.exports = {
    run: async (msg, args, client) => {
        let gd = datastorage.getGuildData(msg.guild.id);
    },
    meta: {
        name: "setmodrole",
        description: "Sets the guild's mod role.",
        usage: ["mod role name"],
        permissionLevel:"guildOwner",
        guildOnly:true
    }
}