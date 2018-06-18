const {
    MessageEmbed
} = require(`discord.js`);
const Util = require(`../Util`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
const snek = require(`snekfetch`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length != 1) return Util.sendInvalidUsage(cookieblob.commands.get(`random`), msg);
        switch (args[0]) {
            case `cat`:
                const cat = (await snek.get(`https://thecatapi.com/api/images/get`, {
                        redirect: false
                    }))
                    .headers.original_image;
                msg.channel.send(new MessageEmbed().setImage(cat));
                break;
            case `dog`:
                async function getDog() {
                    const dog = (await snek.get(`https://random.dog/woof`).send()).body.toString();
                    if (dog.endsWith(`.mp4`)) return await getDog();
                    return `https://random.dog/` + dog;
                }
                const dog = await getDog();
                msg.channel.send(new MessageEmbed().setImage(dog));
                break;
            case `parrot`:
                await msg.channel.send(cookieblob.guilds.get(`393781962545954817`).emojis.random(1).toString());
                break;
            default:
                Util.sendInvalidUsage(cookieblob.commands.get(`random`), msg);
                break;
            case "catfact":
            const catfactres = await snek.get(`https://catfact.ninja/fact`).send();
            await msg.channel.send(`:ok_hand: Fact: *${catfactres.body.fact}*`);
            break;
            case "dogfact":
            const dogfactres = await snek.get(`https://dog-api.kinduff.com/api/facts`).send();
            await msg.channel.send(`:ok_hand: Fact: *${dogfactres.body.facts[0]}*`);
            break;
        }
    },
    name: `random`,
    description: `Get a random cat, parrot or dog.`,
    usage: [`cat/dog/parrot`],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}