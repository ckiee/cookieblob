const cookieblob = require("../cookieblob");
const {MessageEmbed, Message, Client} = require("discord.js");
module.exports = {
    /**
     * @argument {Message} msg
     * @argument {Client} client
     * @argument {Array<String>} args 
     */
    run: async (msg, args, client) => {
        if (!msg.guild.me.hasPermission("ADD_REACTIONS")) return msg.channel.send(":x: I need `Add Reactions` permissions for this! (So you can use my page system)");
        if (!msg.guild.me.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":x: I need `Manage Messages` permissions for this! (So I can remove your reactions for my page system!)");
        const abandonTime = 120000;//ms
        const cpp = 10; // commands per page
        const commands = Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin").filter(cx => cx.meta.permissionLevel != "botOwner");
        let currentPage = 0;
        const controlArrow = "▶";
        const backwardsArrow = "◀";
        const xEmote = "❌";
        async function makeEmbed() {
            let startFrom = currentPage*cpp;
            let pageCmds = commands.slice(startFrom, startFrom + cpp);
            let embed = new MessageEmbed()
            .setAuthor("Cookieblob command list - Page "+(currentPage+1),msg.author.avatarURL)
            .setColor(0xffc300)
            .setTimestamp(new Date());
            pageCmds.forEach(cmd => {
                embed.addField(cmd.meta.name,`Description: \`${cmd.meta.description}\` 
Usage: \`${require("../util").renderUsage(cmd.meta.name)}\``);    
            });
            return embed;
        }
        let emB = await makeEmbed();
        let m = await msg.channel.send(emB);
        await m.react(backwardsArrow);
        await m.react(controlArrow);
        await m.react(xEmote);
        async function movePage(backwards) {
            if (backwards) currentPage--;
            else currentPage++;
            let emBn = await makeEmbed();
            await m.edit(emBn);
        }
        async function makePageMoveCollector(backwards) {
            let collector = m.createReactionCollector(
                (reaction, user) => reaction.emoji.name == backwards?backwardsArrow:controlArrow && user.id === msg.author.id,
                {time:abandonTime}
            );
            collector.on('collect', async r => {
                await movePage(backwards);
            });
            collector.on('end', async collected => {
               await m.delete(); 
            });
        }

        await makePageMoveCollector(true);
        await makePageMoveCollector(false);
        let exitCollector = m.createReactionCollector(
            (reaction, user) => reaction.emoji.name == xEmote && user.id === msg.author.id,
            {time:abandonTime}
        );
        exitCollector.on('collect', async r => {
            if (msg.deletable) await msg.delete();
            if (m.deleteable) await m.delete();
        });
        exitCollector.on('end', async collected => {
           await m.delete(); 
        });
    },
    meta: {
        name: "help",
        description: "Show the list of commands you are currently looking at!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}