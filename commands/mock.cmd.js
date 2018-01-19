const {Client, Message}  = require("discord.js");
const { spongeMock } = require("spongemock");
module.exports = {
                /**
     * @param {Message} msg
     * @param {Array<String>} args
     * @param {Client} client
     */
    run: async (msg, args, client) => {
        let mocked = spongeMock(args.join(" "));
        msg.channel.send(`<:cbMock:403915279211692042> ${mocked}`);
    },
    meta: {
        name: "mock",
        description: "yOU cAN uSe ThIs To MOcK pEoPlE",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}