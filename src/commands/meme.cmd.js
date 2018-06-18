const {
    Message,
    MessageEmbed
} = require(`discord.js`);
const snek = require(`snekfetch`);
const randomItem = require(`random-item`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        const m = await msg.channel.send(new MessageEmbed().setDescription(`<a:loadingrolling:393744853684584448>`));
        const res = await snek.get(`https://api.imgflip.com/get_memes`);
        const meme = randomItem(res.body.data.memes);
        m.edit(new MessageEmbed()
            .setAuthor(msg.author.tag, msg.author.avatarURL())
            .setTimestamp(new Date())
            .setFooter(`Meme supplied by imgflip.com API`)
            .setTitle(meme.name)
            .setImage(meme.url)
        );
    },
    name: `meme`,
    description: `Get the top viral meme from Imgur.`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}