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
         * @type {?{(QueueEntry)|"radio"}
         */
        this.currentlyPlaying = undefined;
        /**
         * @type {?TextChannel}
         */
        this.textChannel = undefined;
        /**
         * @type {?VoiceChannel}
         */
        this.voiceChannel = undefined;
        /**
         * @type {?StreamDispatcher}
         */
        this.dispatcher = undefined;
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
                    resolve(undefined);
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
        let voiceConnection = this.voiceChannel.guild.voiceConnection;
        if (!this.voiceChannel.joinable 
            && !this.voiceChannel.members.has(this.voiceChannel.guild.me.id)) return await this.textChannel.send(`I could not join that voice channel!`);
        
        if (!this.voiceChannel.members.has(this.voiceChannel.guild.me.id)) voiceConnection = await this.voiceChannel.join();
        if (!voiceConnection) {
            // we're in some weird state, we dont wanna be in this state.
            this.voiceChannel.leave();
            return this.play();
        }
        const queueItem = this.queue.shift();
        this.dispatcher = voiceConnection.play(ytdl(queueItem.link, {filter: "audioonly"}));
        this.currentlyPlaying = queueItem;
        this.skippers = new Set();
        this.dispatcher.once("end", () => {
            this.currentlyPlaying = undefined;
            if (this.queue.length > 0) this.play().catch(err => { throw err });
            else this.voiceChannel.leave();
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
    /**
     * Stops whatever is currently playing.
     * @param {Boolean} deleteState Reset the queue and skippers count.
     * @returns {Promise<void>}
     */
    async stop(deleteState = true) {
        if (this.dispatcher) {
            this.dispatcher.removeAllListeners("end");
            this.dispatcher.end();
        }
        if (this.voiceChannel) this.voiceChannel.leave();

        this.currentlyPlaying = undefined;  
        if (deleteState) {
            this.queue = [];
            this.skippers = new Set();
        }
        this.cookieblob.musicGuilds.set(this.id, this);
    }
}