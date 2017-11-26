module.exports = {
    run: async (msg, args, client) => {
        let m = await msg.channel.send("Pong! :ping_pong:");
        m.edit(`Pong! :ping_pong: (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~client.ping}ms)`);
    },
    meta: {
        name: "ping",
        description: ":ping_pong:",
        usage: [],
        permissionLevel:0
    }
}