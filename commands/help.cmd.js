const cookieblob = require("../cookieblob");
const {MessageEmbed, Message, Client} = require("discord.js");
module.exports = {
    /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        if (args.length < 1) args[0] = 1;
        if (args[0] < 1) return msg.channel.send(":x: Pages start from `1`!");
        const abandonTime = 40000;//ms
        const cpp = 15; // commands per page
        const commands = Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin").filter(cx => cx.meta.permissionLevel != "botOwner");
        let currentPage = args[0] - 1;
        function isEmptyPage(page) {
            let startFrom = page*cpp;
            let pageCmds = commands.slice(startFrom, startFrom + cpp);
            return args.length == 0;
        }
        function getLastProperPage() {
            let amount = commands.length;
            let result = commands.length/cpp;
            if (commands.length%cpp != 0) result++;
            return ~~result;
        }
        if (isEmptyPage(currentPage)) return msg.channel.send(`Invalid page! Range is 1 to ${getLastProperPage()}`);
        async function makeEmbed() {
            let startFrom = currentPage*cpp;
            let pageCmds = commands.slice(startFrom, startFrom + cpp);
            let embed = new MessageEmbed()
            .setAuthor("Cookieblob command list - Page "+(currentPage+1),msg.author.avatarURL)
            .setColor(0xffc300)
            .setTimestamp(new Date())
            .setDescription(pageCmds.map(cmd => `**${cmd.meta.name}** - ${cmd.meta.description}\nUsage: ${require("../util").renderUsage(cmd.meta.name)}`).join("\n\n"));
//             pageCmds.forEach(cmd => {
//                 embed.addField(cmd.meta.name,`Description: \`${cmd.meta.description}\` 
// Usage: \`${require("../util").renderUsage(cmd.meta.name)}\``);    
//             });
            return embed;
        }
        let emB = await makeEmbed();
        let m = await msg.channel.send(emB);
    },
    meta: {
        name: "help",
        description: "Show the list of commands you are currently looking at!",
        usage: ["page:number"],
        permissionLevel:0,
        guildOnly:false
    }
}
