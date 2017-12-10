const MessageEmbed = require("discord.js").MessageEmbed;
const animals = require("random-animal");
const util = require("../util");
module.exports = {
    run: async (msg, args, client) => {
        if (args.length != 1) return msg.channel.send(util.invalidUsageEmbed(msg,"random"));
        switch (args[0]) {
            case "cat":
            let cat = await animals.cat();
            msg.channel.send(new MessageEmbed()
            .setImage(cat)
            );
            break;
            case "dog":
            let dog = await animals.dog();
            msg.channel.send(new MessageEmbed()
            .setImage(dog)
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
        permissionLevel:0,
        guildOnly:false
    }
}