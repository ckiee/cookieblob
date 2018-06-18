const {
    Message
} = require(`discord.js`);
const {
    spongeMock
} = require(`spongemock`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        const mocked = spongeMock(args.join(` `));
        msg.channel.send(`<:cbMock:403915279211692042> ${mocked}`);
    },
    name: `mock`,
    description: `yOU cAN uSe ThIs To MOcK pEoPlE`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}