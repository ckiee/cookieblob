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
        this.imgurClientID = config.imgurClientID;
        /**
         * @type {String}
         */
        this.youtubeApiKey = config.youtubeApiKey;
    }
}