import { Client } from "discord.js";
import loadAllCmds from "./CommandLoader";
class Cookieblob extends (Client as { new({}): any;}) /* small trick so ts doesnt complain about super */{
    constructor(r, config) {
        super({disableEveryone: true, disabledEvents: ["TYPING_START"]});
        this.config = config;
        if (this.isDevelopment()) {
            this.emit("debug", "In development, showing debug logs.");
            this.on("ready", () => this.emit("debug", `Logged in as ${this.user.tag}.`));
        }
        loadAllCmds(this).then(cmds => this.commands = cmds);
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
export default Cookieblob;