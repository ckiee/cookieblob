const RichEmbed = require("discord.js").RichEmbed;
const animals = requrie("random-animal");
const util = require("../util");
module.exports = {
    run: async (msg, args, client) => {
        if (args.length != 1) return msg.channel.send(util.invalidUsageEmbed(msg,"random"));
        switch (args[0]) {
            case "cat":
            let url = await animals.cat();
            msg.channel.send(new RichEmbed()
            .setImage(url)
            );
            break;
            case "dog":
            let url = await animals.dog();
            msg.channel.send(new RichEmbed()
            .setImage(url)
            );
            break;
            default: 
            msg.channel.send(util.invalidUsageEmbed(msg,"random"));
            break;
        }
    },
    meta: {
        name: "random",
        description: "Get a random cat or dog.",
        usage: ["cat/dog"],
        permissionLevel:0
    }
}