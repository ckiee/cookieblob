/** @module */
const { Client } = require("discord.js");
const CommandLoader = require("./CommandLoader");
const MessageHandler = require("./MessageHandler");
const GuildEvents = require("./GuildEvents");
const dbots = require("dbots");
const MusicGuild = require("./MusicGuild");
const MusicRadio = require("./MusicRadio");
const VoiceStateUpdate = require("./VoiceStateUpdate");
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
        this.r = r;
        if (this.isDevelopment()) {
            this.emit("debug", "In development, showing debug logs.");
            this.on("ready", () => this.emit("debug", `Logged in as ${this.user.tag}.`));
        }
        /**
        * @type {Map<String, Command>}
        */
        CommandLoader(this).then(cmds => this.commands = cmds);
        this.on('voiceStateUpdate', (unusedvar, member) => VoiceStateUpdate(this, member));
        this.on('message', msg => MessageHandler(this, msg));
        
        this.on('ready', () => GuildEvents(this));
        this.on('guildCreate', () => GuildEvents(this));
        this.on('guildRemove', () => GuildEvents(this));
        /**
         * @type {Map<String, MusicGuild>}
         */
        this.musicGuilds = new Map();

        this._radio = undefined; 

        if (this.config.enableBotStatPost) {
            this.once("ready", () => {
                this.poster = new dbots.Poster({
                    apiKeys: this.config.listKeys,
                    clientID: this.user.id
                });
                this.postInterval = setInterval(() => {
                    this.poster.postManual(this.guilds.size);
                }, 1800000);
            });
        }
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

    async radio() {
        if (this._radio) return this._radio;
        this._radio = await MusicRadio(this);
        return this._radio;
    }
}