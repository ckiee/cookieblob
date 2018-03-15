const { MessageEmbed } = require("discord.js");
const Util = require("../Util");
const Cookieblob = require("../Cookieblob");
const Permissions = require("../Permissions");
const snek = require("snekfetch");
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
            const cat = (await snek.get("https://aws.random.cat/meow").send()).body.file;
            msg.channel.send(new MessageEmbed().setImage(cat));
            break;
            case "dog":
            async function getDog() {
                const dog = (await snek.get("https://random.dog/woof").send()).text;
                if (dog.endsWith(".mp4")) return await getDog();
                return "https://random.dog/"+dog;
            }
            const dog = await getDog();
            msg.channel.send(new MessageEmbed().setImage(dog));
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