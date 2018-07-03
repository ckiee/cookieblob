const {
    MessageEmbed
} = require(`discord.js`);
const Util = require(`../Util`);
const Cookieblob = require(`../Cookieblob`);
const sample = require("lodash/sample");
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
            case `catfact`:
            const catfactres = await snek.get(`https://catfact.ninja/fact`).send();
            await msg.channel.send(`:ok_hand: Fact: *${catfactres.body.fact}*`);
            break;
            case `dogfact`:
            const dogfactres = await snek.get(`https://dog-api.kinduff.com/api/facts`).send();
            await msg.channel.send(`:ok_hand: Fact: *${dogfactres.body.facts[0]}*`);
            break;
            case `blob`:
            await msg.channel.send(new MessageEmbed().setImage(`https://i.ronthecookie.me/blobs/${sample(blobs)}`));
            break;
        }
    },
    name: `random`,
    description: `Get a random cat, parrot or dog.`,
    usage: [`cat/dog/parrot/catfact/dogfact/blob`],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}
const blobs = ["ablobaww.gif","ablobbounce.gif","ablobcouple.gif","ablobcry.gif","ablobdrool.gif","ablobflushed.gif","ablobfrown.gif","ablobgift.gif","ablobgrimace.gif","ablobgrin.gif","ablobhearteyes.gif","ablobkiss.gif","abloblurk.gif","ablobmaracas.gif","ablobmelt.gif","ablobnervous.gif","ablobnom.gif","ablobnompopcorn.gif","ablobowo.gif","ablobpats.gif","ablobpeek.gif","ablobreach.gif","ablobreachreverse.gif","ablobsadcloud.gif","ablobsalute.gif","ablobshake.gif","ablobsleep.gif","ablobsmile.gif","ablobsunglasses.gif","ablobsweats.gif","ablobthinkingfast.gif","ablobtonguewink.gif","ablobunamused.gif","ablobuwu.gif","ablobwave.gif","ablobwavereverse.gif","ablobweary.gif","ablobwink.gif","acongablob.gif","ajakeblob.gif","apartyblob.gif","aphotoblob.gif","athinkingwithblobs.gif","b1nzyblob.png","b4nzyblob.png","blob0w0.png","blobamused.png","blobangel.png","blobangery.png","blobangry.png","blobastonished.png","blobawkward.png","blobaww.png","blobbandage.png","blobblush.png","blobbored.png","blobbowing.png","blobcheeky.png","blobcheer.png","blobconfounded.png","blobconfused.png","blobcool.png","blobcouncil.png","blobcouple.png","blobcowboy.png","blobcry.png","blobdancer.png","blobdead.png","blobderpy.png","blobdetective.png","blobdevil.png","blobdizzy.png","blobdrool.png","blobexpressionless.png","blobeyes.png","blobfacepalm.png","blobfearful.png","blobfistbumpL.png","blobfistbumpR.png","blobflushed.png","blobfrowningbig.png","blobfrowning.png","blobfrown.png","blobgift.png","blobglare.png","blobgo.png","blobgrin.png","blobhammer.png","blobhearteyes.png","blobheart.png","blobhero.png","blobhighfive.png","blobhug.png","blobhyperthinkfast.png","blobhyperthink.png","blobhypesquad.png","blobidea.png","blobjoy.png","blobkissblush.png","blobkissheart.png","blobkiss.png","bloblul.png","blobmelt.png","blobmoustache.png","blobnauseated.png","blobnerd.png","blobnervous.png","blobneutral.png","blobninja.png","blobnogood.png","blobnomchristmas.png","blobnomcookie.png","blobnomouth.png","blobnom.png","blobnostar.png","blobnotsureif.png","blobokhand.png","blobok.png","blobonfire.png","blobopenmouth.png","bloboro.png","bloboutage.png","blobowoevil.png","blobowo.png","blobparty.png","blobpatrol.png","blobpats.png","blobpeek.png","blobpensive.png","blobpin.png","blobpoliceangry.png","blobpolice.png","blobpopcorn.png","blobpopsicle.png","blobpout2.png","blobpray.png","blobreachdrool.png","blobreach.png","blobreachreverse.png","blobrofl.png","blobrollingeyes.png","blobross.png","blobsadcloud.png","blobsad.png","blobsadreach.png","blobsalute.png","blobsanta.png","blobscream.png","blobshh.png","blobshrug.png","blobsleeping.png","blobsleepless.png","blobsmilehappyeyes.png","blobsmilehappy.png","blobsmileopenmouth2.png","blobsmileopenmouth.png","blobsmile.png","blobsmilesweat2.png","blobsmilesweat.png","blobsmiley.png","blobsmirk.png","blobsneezing.png","blobsnuggle.png","blobsob.png","blobsplosion.png","blobspy.png","blobstop.png","blobsunglasses.png","blobsurprised.png","blobsweats.png","blobteefs.png","blobthinkingcool.png","blobthinkingdown.png","blobthinkingeyes.png","blobthinkingfast.png","blobthinkingglare.png","blobthinking.png","blobthinkingsmirk.png","blobthonkang.png","blobthumbsdown.png","blobthumbsup.png","blobthump.png","blobtilt.png","blobtired.png","blobtongue.png","blobtonguewink.png","blobtriumph.png","blobugh.png","blobunamused.png","blobunsure.png","blobupset.png","blobupsidedown.png","blobuwu.png","blobwaitwhat.png","blobwave.png","blobwavereverse.png","blobweary.png","blobwhistle.png","blobwink.png","blobwizard.png","blobwoah.png","blobxd.png","blobyum.png","blobzippermouth.png","bolb.png","doggoblob.png","feelsblobman.png","ferretblob.png","gentleblob.png","googlebee.png","googleblueheart.png","googlecake.png","googlecatface.png","googlecatheart.png","googlecat.png","googledog.png","googlefire.png","googleghost.png","googlegun.png","googlemuscleL.png","googlemuscleR.png","googlepenguin.png","googlerabbit.png","googleredheart.png","googlesheep.png","googlesnake.png","googleturtle.png","googlewhale.png","GreenTick.png","jakeblob.png","kirbyblob.png","nellyblob.png","nikoblob.png","notlikeblob.png","photoblob.png","pikablob.png","pusheenblob.png","rainblob.png","RedTick.png","reindeerblob.png","rickblob.png","thinkingwithblobs.png","wolfiriblob.png","wumpusblob.png"];