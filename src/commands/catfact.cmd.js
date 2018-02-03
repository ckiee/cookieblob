const request = require("snekfetch");
module.exports = {
    run: async (msg, args, client) => {
        const req = await request.get("https://catfact.ninja/fact");
        await msg.channel.send(`:ok_hand: Fact: *${JSON.parse(req.body).fact}*`);
    },
    meta: {
        name: "catfact",
        description: "Show a random cat fact!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}