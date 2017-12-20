const {Client, Message, MessageEmbed}  = require("discord.js");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let g = msg.guild;
        msg.channel.send(new MessageEmbed()
        .setTitle(`Info about guild '${g.name}' (${g.id})`)
        .setTimestamp(new Date())
        .setThumbnail(g.iconURL)
        .setColor(0x0ea5d3)
        .setDescription(
`Member count \`${g.memberCount}\`
Guild Leader \`${g.owner.user.tag} (${g.ownerID})\`
Roles \`(${g.roles.size}) ${g.roles.map(v => v.name).join(", ")}\`
Afk Channel \`${g.afkChannel?g.afkChannel.name:"*none*"}\`
Channels \`(${g.channels.size}) ${g.channels.map(v => v.name).join(", ")}\`
Emojis \`${g.emojis.join(", ")}\`
Region \`${g.region}\`
Special Features \`${g.features.map(v => v.toLowerCase()).join(", ")}\``
        )
    );
    },
    meta: {
        name: "guildinfo",
        description: "Shows some info about the guild you're typing this in.",
        usage: [],
        permissionLevel:0,
        guildOnly:true
    }
}