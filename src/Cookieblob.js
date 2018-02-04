/** @module */
const { Client } = require("discord.js");
const CommandLoader = require("./CommandLoader");
const MessageHandler = require("./MessageHandler");
const Config = require("./Config");
/** @class */
module.exports = class Cookieblob extends Client {
    /**
     * @param {*} r 
     * @param {Config} config 
     */
    constructor(r, config) {
        super({disableEveryone: true, disabledEvents: ["TYPING_START"]});
        this.config = config;
        if (this.isDevelopment()) {
            this.emit("debug", "In development, showing debug logs.");
            this.on("ready", () => this.emit("debug", `Logged in as ${this.user.tag}.`));
        }
        /**
        * @type {Map<String, Command>}
        */
        CommandLoader(this).then(cmds => this.commands = cmds);
        this.on('message', msg => MessageHandler(this, msg));
    }
    /**
     * Are we in a production enviroment?
     * @returns {Boolean}
     */
    isProduction() {
        return process.env.NODE_ENV == "production";
    }
    /**
     * Are we in a development enviroment?
     * @returns {Boolean}
     */
    isDevelopment() {
        return process.env.NODE_ENV == "development";
    }
}