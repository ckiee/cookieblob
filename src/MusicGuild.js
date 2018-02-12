/** @module */
const Cookieblob = require("./Cookieblob");
const { TextChannel, VoiceChannel, StreamDispatcher, MessageEmbed, GuildMember } = require("discord.js");
const ytdl = require("ytdl-core");
const search = require("youtube-search");

/**
 * @typedef {Object} QueueEntry
 * @property {String} id
 * @property {String} link
 * @property {GuildMember} member
 * @property {String} kind
 * @property {Date} addedAt 
 * @property {String} publishedAt
 * @property {String} channelId
 * @property {String} channelTitle
 * @property {String} title
 * @property {String} description
 * @property {QueueThumbnails} thumbnails
 */
/**
 * @typedef {Object} QueueThumbnails
 * @property {QueueThumbnail} high
 * @property {QueueThumbnail} medium
 * @property {QueueThumbnail} default
 */
/**
 * @typedef {Object} QueueThumbnail
 * @property {String} url
 * @property {Number} width
 * @property {Number} height
 */
module.exports = /** @class */ class MusicGuild {
    /**
     * @param {String} id 
     * @param {Cookieblob} cookieblob
     */
    constructor(id, cookieblob) {
        this.cookieblob = cookieblob;
        this.id = id;
        /**
         * @type {QueueEntry[]}
         */
        this.queue = [];
        /**
         * @type {?QueueEntry}
         */
        this.currentlyPlaying = null;
        /**
         * @type {?TextChannel}
         */
        this.textChannel = null;
        /**
         * @type {?VoiceChannel}
         */
        this.voiceChannel = null;
        /**
         * @type {?StreamDispatcher}
         */
        this.dispatcher = null;
        this.playing = false;
        this.skippers = 0;
    }
    /**
     * @param {String} query 
     * @param {GuildMember} member
     * @returns {Promise<QueueEntry>}
     */
    search(query, member) {
        return new Promise((resolve, reject) => {
            search(query, {key: this.cookieblob.config.youtubeApiKey, type: "video", maxResults: 1}, (err, results) => {
                if (err) reject(err);
                if (results.length == 0) {
                    resolve(null);
                    return;
                }
                let r = results[0];
                r.member = member;
                r.addedAt = new Date();
                this.queue.push(r);
                resolve(r);
            });
        });
    }

    async play() {
        const queueItem = this.queue.shift();
        let voiceConnection = this.voiceChannel.guild.voiceConnection;
        if (!this.voiceChannel.joinable 
            && this.voiceChannel.members.has(this.voiceChannel.guild.me.id)) return await this.textChannel.send(`I could not join that voice channel!`);
        
        if (!this.voiceChannel.members.has(this.voiceChannel.guild.me.id)) voiceConnection = await this.voiceChannel.join();
        this.dispatcher = voiceConnection.play(ytdl(queueItem.link, {filter: "audioonly"}));
        this.currentlyPlaying = queueItem;
        this.playing = true;
        this.skippers = 0;
        this.dispatcher.on('end', () => {
            this.playing = false;
            if (this.queue.length > 0) this.play().catch(err => { throw err });
        });
        await this.textChannel.send(new MessageEmbed()
            .setAuthor(queueItem.member.user.tag, queueItem.member.user.avatarURL())
            .setDescription(queueItem.description)
            .setTimestamp(queueItem.addedAt)
            .setFooter("Cookieblob Music")
            .setTitle(queueItem.title)
            .setImage(queueItem.thumbnails.high.url)
        );
        this.cookieblob.musicGuilds.set(this.id, this);
    }
}