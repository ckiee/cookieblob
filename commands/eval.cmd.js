const cookieblob = require("../cookieblob");
const datastorage = require("../datastorage");
module.exports = {
    run: async (msg, args, client) => {
        try {
        const toEval = args.join(" ");
        let result = eval(toEval);
        if (typeof result != "string") result = require("util").inspect(evaled);
        if (result.split("") > 1999) return msg.channel.send("Message is over the discord message contents limit.");
        msg.channel.send("```"+result+"```");
        } catch (error) {
            msg.channel.send("Error!```"+error+"```");
        }
    },
    meta: {
        name: "eval",
        description: "Evaluate a command",
        usage: [],
        permissionLevel:"botOwner"
    }
}