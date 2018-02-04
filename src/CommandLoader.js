/** @module */
const glob = require("glob");
const Cookieblob = require("./Cookieblob");
const Command = require("./Command");
/**
 * Load all of the commands in the 'commands' directory.
 * @param {Cookieblob?} Cookieblob A cookieblob instance used for debug logs.
 * @returns {Promise<Map<String, Command>>}
 */
module.exports = (cookieblob) => {
    return new Promise((resolve, reject) => {
        const map = new Map();
        glob("src/commands/**.cmd.js", (error, matches) => {
            if (error) return reject(error);
            matches = matches.map(fn => {
                try {
                    return require(`${process.cwd()}/${fn}`);
                } catch (error) {
                    if (cookieblob) cookieblob.emit("debug", `\n\nFailed to load '${process.cwd()}/${fn}', error: ${error.stack}\nThis is only a warning, the bot will still work.\n`);
                    return error;
                }
            }).filter(v => !(v instanceof Error)).map(v => new Command(v)).forEach(v => map.set(v.name, v));
            resolve(map);
        });
    });
}