const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");

/**
 * @param {Cookieblob} cookieblob 
 * @param {String} str
 * @returns {String} 
 */
function filter(cookieblob, s) {
    const r = "[redacted]";
    return s.split(cookieblob.token).join(r).split(cookieblob.config.youtubeApiKey).join(r).split(cookieblob.config.discordSecret).join(r);
}
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        try {
            const toEval = args.join(" ");
            let result = eval(toEval);
            if (typeof result != "string") result = require("util").inspect(result);
            if (result instanceof Promise) result = await result;
            if (result.length > 1990) return await msg.channel.send("Message is over the discord message contents limit.");
            await msg.channel.send("```js\n"+filter(result)+"\n```");
        } catch (error) {
            console.log(`Error while ${msg.author.tag} ran eval.\n${error.stack}`);
            await msg.channel.send("Error!```"+filter(error.stack)+"```");
        }
    },
    name: "eval",
    description: "Evaluate a command",
    usage: [],
    permissionLevel:Permissions.botDeveloper,
    guildOnly:false
}