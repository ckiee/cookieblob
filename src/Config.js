/** @module */
module.exports = /** @class */ class Config {
    /**
     * @param {Object} config 
     */
    constructor(config) {
        /**
         * @type {String}
         */
        this.defaultPrefix = config.defaultPrefix;
        /**
         * @type {String}
         */
        this.discordToken = config.discordToken;
        /**
         * @type {String}
         */
        this.ownerID = config.ownerID;
        /**
         * @type {String[]}
         */
        this.developerIDs = config.developerIDs;
        /**
         * @type {String}
         */
        // this.imgurClientID = config.imgurClientID;
        /**
         * @type {String}
         */
        this.youtubeApiKey = config.youtubeApiKey;
        /**
         * @type {String}
         */
        this.discordSecret = config.discordSecret;
        /**
         * @type {String}
         */
        this.hostURL = config.hostURL;
        /** @type {Boolean} */
        this.enableBotStatPost = config.enableBotStatPost;
        /** @type {Object} */
        this.listKeys = config.listKeys;
    }
}