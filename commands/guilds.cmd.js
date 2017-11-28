module.exports = {
    run: async (msg, args, client) => {
        let content = `Showing ${client.guilds.size} guilds:\`\`\``;
        client.guilds.forEach(guild => {
            content+=`\n${guild.name} (members: ${guild.memberCount})`;
        });
        content+="```";
        msg.channel.send(content);
    },
    meta: {
        name: "guilds",
        description: "Show all guilds.",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}