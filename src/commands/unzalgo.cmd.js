const {
    Message
} = require(`discord.js`);
const banish = require(`to-zalgo/banish`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        await msg.channel.send(`Unzalgoified: *\`${banish(args.join(` `))}\`*`);
    },
    name: `unzalgo`,
    description: `Convert zalgo text into normal text.`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}