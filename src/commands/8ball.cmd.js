const ball_choices = [`It is certain`, `It is decidedly so`, `Without a doubt`, `Yes definitely`, `You may rely on it`, `As I see it, yes`, `Most likely`, `Outlook good`, `Yes`, `Signs point to yes`, `Reply hazy try again`, `Ask again later`, `Better not tell you now`, `Cannot predict now`, `Concentrate and ask again`, `Don't count on it`, `My reply is no`, `My sources say no`, `Outlook not so good`, `Very doubtful`];
const {
    Message
} = require(`discord.js`);
const Cookieblob = require(`../Cookieblob`);
const Permissions = require(`../Permissions`);
const Util = require(`../Util`);
module.exports = {
    /**
     * @param {Cookieblob} cookieblob
     * @param {Message} msg
     * @param {String[]} args
     */
    run: async (cookieblob, msg, args) => {
        if (args.length < 1) return Util.sendInvalidUsage(cookieblob.commands.get(`8ball`), msg);
        msg.channel.send(`:8ball: ${ball_choices[getRandomInt(0,ball_choices.length)]}.`);
    },
    name: `8ball`,
    description: `🎱 Ask the 8ball a question.`,
    usage: [`question`],
    permissionLevel: Permissions.everyone,
    guildOnly: false
}

function getRandomInt(min, max) { // from mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}