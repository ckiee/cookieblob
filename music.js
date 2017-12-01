const { Message, User, RichEmbed, StreamDispatcher } = require('discord.js');
const cookieblob = require("./cookieblob");
let guilds = {};
const ytdl = require("ytdl-core");
const yts = require('youtube-search');
var searchoptions = {
    maxResults: 1,
    key: cookieblob.config.ytKey,
    type:"video",
    safeSearch:"none"
};

class MusicGuildData {
    constructor(guildID) {
        this.dispatcher = null;
        this.queue = [];
        this.playing = false;
        guilds[guildID] = this;
    }
    setDispatcher(dispatcher) {
        this.dispatcher = dispatcher;
    }
    /**
     * @property {Boolean} value
     */
    setPlaying(value) {
        this.playing = value;
    }
    /**
     * @returns {Boolean}
     */
    getPlaying() {
        return this.playing;
    }
    /**
     * @returns {StreamDispatcher}
     */
    getDispatcher() {
        return this.dispatcher;
    }
    /**
     * 
     * @param {User} user 
     * @param {Object} youtubeResult 
     */
    addToQueue(user, youtubeResult) {
        this.queue.push({user:user,youtube:youtubeResult});
    }
    /**
     * @returns {QueueEntry}
     */
    shiftQueue() {
        return this.queue.shift();
    }
}
/**
 * @typedef {Object} QueueEntry
 * @property {User} user
 * @property {Object} youtube
 */


/**
 * 
 * @param {String} guildID 
 * @returns {MusicGuildData}
 */
function getMusicGuild(guildID) {
    if (guilds[guildID] == null) guilds[guildID] = new MusicGuildData(guildID);
    return guilds[guildID];
}

/**
 * 
 * @param {Message} msg 
 * @param {String} searchQuery 
 */
function searchAddToQueue(msg, searchQuery) {
    return new Promise((resolve,reject)=>{
        yts(searchQuery,searchoptions,(error,results)=>{
            if (error) return reject(error);
            let result = results[0];
            let mg = getMusicGuild(msg.guild.id);
            mg.addToQueue(msg.author, result);
            resolve(result);
        });
    });
}

/**
 * @param {Message} msg
 */
async function play(msg) {
    let mg = getMusicGuild(msg.guild.id);
    let voiceChannel = await msg.member.voiceChannel.join();
    let sq = mg.shiftQueue();
    mg.setDispatcher(voiceChannel.playStream(ytdl(sq.youtube.link,{filter:"audio"}),{passes:5}));
    mg.getDispatcher().on('end',reason => {
        let sqa = mg.shiftQueue();
        mg.setPlaying(false);
        if (sqa == null) {
            voiceChannel.disconnect();
        }
        else {
            if (reason == "skip") msg.channel.send("[debug] attempting to play next song.");
            play(msg).catch(console.error);
        } 
    });
    mg.setPlaying(true);
    msg.channel.send(new RichEmbed()
    .setColor(0x0ea5d3)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setDescription(sq.youtube.description)
    .setTimestamp(new Date())
    .setTitle(sq.youtube.title)
    .setImage(sq.youtube.thumbnails.high.url)
    .setURL(sq.youtube.link)
);
}

module.exports = {
    play: play,
    searchAddToQueue: searchAddToQueue,
    getMusicGuild: getMusicGuild
}