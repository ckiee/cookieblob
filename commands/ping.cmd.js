module.exports = {
    run: (msg, args, client) => {
        msg.channel.send("Pong. :ping_pong:");
    },
    meta: {
        name: "ping",
        description: ":ping_pong:",
        usage: []
    }
}