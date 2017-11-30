const { Message, User, RichEmbed } = require('discord.js');
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
        this.queue = [];
        guilds[guildID] = this;
    }
    /**
     * 
     * @param {User} user 
     * @param {Object} youtubeResult 
     */
    addToQueue(user, youtubeResult) {
        queue.push({user:user,youtube:youtubeResult});
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
 * @property {Object} youtubeResult
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
            if (error) reject(error);
            console.log(results);
            let result = results[0];
            let mg = getMusicGuild(msg.guild.id);
            mg.addToQueue(msg.author, result);
            resolve(mg);
        });
    });
}

/**
 * @param {Message} msg
 * @param {String} searchQuery
 */
async function play(msg, searchQuery) {
    await searchAddToQueue(msg, searchQuery);
    let mg = getMusicGuild(msg.guild.id);
    let voiceChannel = await msg.member.voiceChannel.join();
    let sq = mg.shiftQueue();
    voiceChannel.playStream(ytdl(sq.youtubeResult.link,{filter:"audio"}));
    msg.channel.send(new RichEmbed()
    .setColor(0x0ea5d3)
    .setAuthor(msg.author.username, msg.author.avatarURL)
    .setTimestamp(new Date())
    .setTitle(sq.youtubeResult.title)
    .setImage(sq.youtubeResult.thumbnails.maxres.url)
    .setURL(sq.youtubeResult.link)
);
}

module.exports = {
    play: play,
    searchAddToQueue: searchAddToQueue
}