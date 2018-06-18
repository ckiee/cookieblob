const {
    Message
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Util = require(`../Util`);
const Permissions = require(`../Permissions`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        const mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (!msg.member.voiceChannel) return await msg.channel.send(`:x: Please join a voice channel to listen to the radio.`);
        if (mg.currentlyPlaying) return await msg.channel.send(`:x: I'm already playing something, please stop it using 'stop' or 'skip'.`);
        mg.skippers = new Set();
        mg.currentlyPlaying = `radio`;
        mg.voiceChannel = msg.member.voiceChannel;
        mg.textChannel = msg.channel;
        let voiceConnection = await mg.setupVoice();
        if (!voiceConnection) {
            // we`re in some weird state, we dont wanna be in this state.
            this.voiceChannel.leave();
            return this.play();
        }
        voiceConnection.play(await cookieblob.radio());
        await msg.channel.send(`:ok_hand:`);
    },
    name: `playradio`,
    description: `Play songs from the Cookieblob Radio`,
    usage: [],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}