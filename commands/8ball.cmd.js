const ball_choices = ["It is certain","It is decidedly so","Without a doubt","Yes definitely","You may rely on it","As I see it, yes","Most likely","Outlook good","Yes","Signs point to yes","Reply hazy try again","Ask again later","Better not tell you now","Cannot predict now","Concentrate and ask again","Don't count on it","My reply is no","My sources say no","Outlook not so good","Very doubtful"];
module.exports = {
    run: async (msg, args, client) => {
        if (args.length < 1) require("../util").invalidUsageEmbed(msg,"8ball");
        msg.channel.send(`:8ball: ${ball_choices[getRandomInt(0,ball_choices.length)]}.`);
    },
    meta: {
        name: "8ball",
        description: ":8ball: Ask the 8ball a question.",
        usage: ["question"],
        permissionLevel:0
    }
}
function getRandomInt(min, max) { // from mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }