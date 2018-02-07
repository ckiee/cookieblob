const { MessageEmbed } = require("discord.js");
const animals = require("random-animal");
const Util = require("../Util");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length != 1) return Util.sendInvalidUsage(cookieblob.commands.get("random"), msg);
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
            case "parrot":
            await msg.channel.send(cookieblob.guilds.get("393781962545954817").emojis.random(1).toString());
            break;
            default: 
            Util.sendInvalidUsage(cookieblob.commands.get("random"), msg);
            break;
        }
    },
    name: "random",
    description: "Get a random cat, parrot or dog.",
    usage: ["cat/dog/parrot"],
    permissionLevel:Permissions.everyone,
    guildOnly:false
}