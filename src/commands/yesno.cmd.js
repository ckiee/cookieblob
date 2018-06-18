const {
    Message,
    MessageEmbed
} = require(`discord.js`);
const request = require(`snekfetch`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let m = await msg.channel.send(new MessageEmbed().setDescription(`<a:loadingrolling:393744853684584448>`));
        const res = await request.get(`https://yesno.wtf/api`).send();
        await m.edit(new MessageEmbed().setAuthor(msg.author.tag, msg.author.avatarURL()).setColor(0xadf442)
            .setImage(res.body.image).setTitle(res.body.answer).setTimestamp(new Date()).setFooter(`Supplied by https://yesno.wtf/`));
    },
    name: `yesno`,
    description: `Yes, or No?`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}