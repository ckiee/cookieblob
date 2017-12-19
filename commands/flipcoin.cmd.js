module.exports = {
    run: async (msg, args, client) => {
        let v;
        if (Math.random() >= 0.5) {
            v = "Heads";
        } else v = "Tails";
        msg.channel.send(`The coin landed on *${v}*.`);
    },
    meta: {
        name: "flipcoin",
        description: "Flip a coin!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}