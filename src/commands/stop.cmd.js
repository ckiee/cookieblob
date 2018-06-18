const {
    Message
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        let mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (!mg.currentlyPlaying) return await msg.channel.send(`There's nothing playing at the moment`);
        await mg.stop(); // dont have to await - it should resolve right when we call it, but why not.
        await msg.channel.send(`:ok_hand: Stopped.`);
    },
    name: `stop`,
    description: `Force-stops any music that is playing.`,
    usage: [],
    permissionLevel: Permissions.guildMod,
    guildOnly: true
}