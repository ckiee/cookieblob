module.exports = {
    run: async (msg, args, client) => {
        if (!args) return msg.channel.send('Hugging yourself? Eh. Maybe mention a member to hug.');
        if (!msg.mentions.members) return msg.channel.send('Invalid member.');
        if (args[1]) return msg.channel.send('Too many arguments! You can only hug one member at a time!');
        if (args[0] !== msg.mentions.members.first) return msg.channel.send('An error occurred.');
        msg.channel.send(`*${msg.author.tag} hugs ${args[0]}*.`);
    },
    meta: {
        name: "hug",
        description: "Hug users.",
        usage: ["member"],
        permissionLevel:0,
        guildOnly:true
    }
}
