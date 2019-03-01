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
        await msg.channel.send("Music has been disabled.");
        const {
            r
        } = cookieblob;
        const userDataNotice = await r.table(`notices`).get(`${msg.author.id}_musicdata`).run();
        let mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (args.length < 1) return await Util.sendInvalidUsage(cookieblob.commands.get(`play`), msg);
        if (!msg.member.voiceChannel) return await msg.channel.send(`:musical_note: Please join a voice channel to play a song.`);
        if (mg.currentlyPlaying == `radio`) return await msg.channel.send(`:x: The radio is currently playing, please stop it using 'stop' or 'skip'.`);
        if (!userDataNotice) {
            await msg.channel.send(`Hey! I want to collect some data about the songs you play.` +
                `\nNext time you play a song I will collect data about the song, this will be used for the new Music Radio feature.` +
                `\nNote: You may opt out using \`optout musicdata\`.`);
            await r.table(`notices`).insert({
                id: `${msg.author.id}_musicdata`,
                optout: false
            }).run();
        }
        mg.voiceChannel = msg.member.voiceChannel;
        mg.textChannel = msg.channel;
        const qe = await mg.search(args.join(` `), msg.member, cookieblob);
        if (userDataNotice && !userDataNotice.optout) { // wont do it for this song since we didnt update the data locally, only on the server.
            let mrd = await r.table(`musicRadio`).get(qe.id).run();
            if (mrd) {
                mrd.views++;
                await r.table(`musicRadio`).update(mrd).run();
            } else {
                mrd = {
                    id: qe.id,
                    views: 1
                };
                await r.table(`musicRadio`).insert(mrd).run();
            }
        }
        mg = cookieblob.musicGuilds.get(msg.guild.id);
        if (!mg.currentlyPlaying) await mg.play();
        else await msg.channel.send(`:ok_hand: Added \`${qe.title}\` to the queue.`);
    },
    name: `play`,
    description: `Play a song from YouTube.`,
    usage: [`youtube song name`],
    permissionLevel: Permissions.everyone,
    guildOnly: true
}