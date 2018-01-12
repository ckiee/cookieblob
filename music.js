const ytdl = require("ytdl-core");
const { Message } = require("discord.js");
// Lots of JSDoc for youtube-search.
/**
 * @typedef {Object} YouTubeThumbnail
 * @property {String} url
 * @property {Number} width
 * @property {Number} height
 */
/**
 * @typedef {Object} YouTubeSearchResultThumbnails
 * @property {YoutubeThumbnail} default
 * @property {YoutubeThumbnail} medium
 * @property {YoutubeThumbnail} high
 * @property {YoutubeThumbnail} standard
 * @property {YoutubeThumbnail} maxres
 */
/**
 * @typedef {Object} YoutubeSearchResult
 * @property {String} id
 * @property {String} link
 * @property {String} kind
 * @property {String} publishedAt
 * @property {String} channelId
 * @property {String} title
 * @property {String} description
 * @property {YoutubeSearchResultThumbnails} thumbnails
 */

/**
 * Search with youtube-search
 * @param {String} term 
 * @returns {Promise<YoutubeSearchResult>}
 */
function search(term) {
    return new Promise((resolve, reject) => {
    const youtubeSearch = require("youtube-search");
    youtubeSearch(term, {
        maxResults: 1,
        key: cookieblob.config.ytKey,
        type:"video",
        safeSearch:"none"
    }, (err, results)=>{
        if (err) return reject(err);
        resolve(results[0]);
    });
});
}
class MusicGuild {
    constructor() {
        /**
         * @type {YoutubeSearchResult[]}
         */
        this.queue = [];
        /**
         * @type {YoutubeSearchResult}
         */
        this.nowPlaying = null;
    }
}

/**
 * Play the first queue item.
 * @param {Message} msg 
 */
function play(msg) {
    /**
     * @type {MusicGuild}
     */
    let musicGuild = msg.guild.musicGuild;
    let song = musicGuild.queue.shift();
    musicGuild.nowPlaying = song
}