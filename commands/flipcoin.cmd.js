module.exports = {
    run: async (msg, args, client) => {
        let v;
        let r = Math.random();
        if (r >= 0.5) {
            v = "Heads";
        } else v = "Tails";
        msg.channel.send(`The coin landed on *${v}*. ${r}`);
    },
    meta: {
        name: "flipcoin",
        description: "Flip a coin!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}