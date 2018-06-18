const {
    Message,
    MessageEmbed
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
        let g = msg.guild;
        msg.channel.send(new MessageEmbed()
            .setTitle(`Info about guild '${g.name}' (${g.id})`)
            .setTimestamp(new Date())
            .setThumbnail(g.iconURL())
            .setColor(0x0ea5d3)
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setDescription(
                `Member count \`${g.memberCount}\`

Guild Leader \`${g.owner.user.tag} (${g.ownerID})\`

Roles \`(${g.roles.size}) ${g.roles.map(v => v.name).join(`, `)}\`

Afk Channel \`${g.afkChannel?g.afkChannel.name:`none`}\`

Channels \`(${g.channels.size}) ${g.channels.map(v => v.name).join(`, `)}\`

Region \`${g.region}\`

Special Features \`${g.features.length==0?`none`:g.features.map(v => v.toLowerCase()).join(`, `)}\``
            )
        );
    },
    name: `guildinfo`,
    description: `Shows some info about the guild you're typing this in.`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}