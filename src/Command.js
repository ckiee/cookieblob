/** @module */

const Permissions = require("./Permissions");

module.exports = /** @class */ class Command {
    /**
     * @param {Object} command 
     */
    constructor(command) {
        /**
         * @type {String}
         */
        this.name = command.name || command.meta.name;
        /**
         * @type {String}
         */
        this.description = command.description || command.meta.description;
        /**
         * @type {String[]}
         */
        this.usage = command.usage || command.meta.usage;
        /**
         * @type {String}
         */
        this.permissionLevel = command.permissionLevel || command.meta.permissionLevel;
        /**
         * @type {Boolean}
         */
        this.guildOnly = command.guildOnly || command.meta.guildOnly;
        /**
         * @type {AsyncFunction}
         */
        this.run = command.run;
        if (!Permissions.isValidPermission(this.permissionLevel)) {
            this.run = (cookieblob, msg, args) => {throw new Error("This command has a invalid permission and could not be safely executed.")};
            console.error(`[command] ${this.name} has a invalid permission, users will be getting errors.`);
        }
    }
}