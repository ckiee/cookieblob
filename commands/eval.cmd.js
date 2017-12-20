const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
module.exports = {
    run: async (msg, args, client) => {
        /**
         * 
         * @param {String} str
         * @returns {String} 
         */
        function filter(str) {
            const r = "[REDACTED]";
            return str.split(cookieblob.config.botsdiscordpwToken).join(r).split(cookieblob.config.discordbotsorgToken).join(r).split(cookieblob.config.ytKey).join(r).split(cookieblob.config.token).join(r);
        } 
        try {
        const toEval = args.join(" ");
        let result = eval(toEval);
        if (typeof result != "string") result = require("util").inspect(result);
        if (result.split("") > 1999) return msg.channel.send("Message is over the discord message contents limit.");
        msg.channel.send("```"+filter(result)+"```");
        } catch (error) {
            msg.channel.send("Error!```"+filter(error)+"```");
        }
    },
    meta: {
        name: "eval",
        description: "Evaluate a command",
        usage: [],
        permissionLevel:"botAdmin",
        guildOnly:false
    }
}