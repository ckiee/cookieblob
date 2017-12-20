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
        const commands = Object.keys(cookieblob.commands).map(cookieblob.getCommand).filter(cm => cm.meta.permissionLevel != "botAdmin" || cm.meta.permissionLevel != "botOwner");
        msg.channel.send("[debug] amount of commands "+commands.length);
        console.log(commands);
        let currentPage = 0;
        const controlArrow = "▶";
        const backwardsArrow = "◀";
        async function makeEmbed(page) {
            let startFrom = page*cpp;
            let pageCmds = commands.slice(startFrom, cpp);
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
        let m = await msg.channel.send(await makeEmbed(currentPage/*should be 0*/));
        async function makeCollector(backwards) {
            const arrow = backwards?backwardsArrow:controlArrow;
        await m.react(arrow);
        const collector = m.createReactionCollector(
            (reaction, user) => reaction.emoji.name == arrow && user.id != m.author.id,
            {time: abandonTime}
        );
        collector.on('collect', async r => {
            collector.stop("ignoreMeCookieblob");
            let nextPage = backwards ? currentPage - 1: currentPage + 1;
            let pageCmds = commands.slice(nextPage*cpp, cpp);
            console.log('pageCmds',nextPage*cpp,cpp);
            console.log(pageCmds);
            if (pageCmds.length == 0) {
                let xOm = await msg.channel.send(`:x: This page is the ${backwards?"first":"last"} page.`);
                await r.remove(msg.author);
                setTimeout(async()=>{await xOm.delete();}, abandonTime/4);
                return;
            }
            currentPage++;
            await r.remove(msg.author);
            await m.edit(await makeEmbed(currentPage));
            await makeCollector(backwards);
        });
        collector.on('end', async (coll, reason) => {
            if (reason != "time") return;
            await m.delete();
        });
    }
    await makeCollector(true);
    await makeCollector(false);
    },
    meta: {
        name: "help",
        description: "Show the list of commands you are currently looking at!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}