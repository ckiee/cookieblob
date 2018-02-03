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
    }
}