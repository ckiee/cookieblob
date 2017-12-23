'use strict';
/** @module cookieblob */
const Discord = require("discord.js");
const MessageEmbed = Discord.MessageEmbed;
const request = require("request");
const client = new Discord.Client();
const config = getConfig();
const childprocess = require("child_process");
const glob = require("glob");
const r = require('rethinkdb');
process.on('unhandledRejection', error => {
    console.error(error.stack);
});
process.stdin.resume();
process.on('SIGINT', function () {
  console.log("Safely destroyed discord client!");
  client.destroy();
  process.exit();
});
const datastorage = require("./datastorage");
let connection; 
r.connect({db:"cookieblob"}).then(rethinkConnection=>{
    module.exports.rethinkConnection = rethinkConnection;
    datastorage.updateLocalConnection(rethinkConnection);
    connection = rethinkConnection;
});
function postBotStats(base, token) {
    request.post(`https://${base}/api/bots/${client.user.id}/stats`, {
        headers: {
            Authorization: token
        },  
        json:true,
        body: {
            server_count: client.guilds.size
        }
    });
}
function postStatsOnAllSites() {
    postBotStats("bots.discord.pw", config.botsdiscordpwToken);
    postBotStats("discordbots.org", config.discordbotsorgToken);
}
client.on('guildCreate', postStatsOnAllSites);
client.on('guildRemove', postStatsOnAllSites);
let commands = {};
client.on('ready',()=>{
    console.log(`Logged in as ${client.user.tag}`);
    const ug = ()=>{
        client.user.setPresence({activity:{name:`${client.guilds.size} guilds! | ${config.prefix}help`, type:"WATCHING"}});
    }
    ug();
    setInterval(ug, 1000*60*5);
    postStatsOnAllSites();
});
client.on('message', async msg => { // Command handler on-message listener
    if (msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(config.prefix)) return; 
    let uiCmd = msg.content.toLowerCase().split(" ")[0].slice(config.prefix.length); // ui stands for 'User Inputted' here
    let cmd = getCommand(uiCmd);
    let args = msg.content.split(" ").slice(1);
    if (cmd == null) return;
    if (cmd.meta.permissionLevel == "botOwner" && msg.author.id != config.ownerID) return msg.channel.send(":x: No permission!");
    if (cmd.meta.permissionLevel == "botAdmin" && config.admins.indexOf(msg.author.id)==-1) return msg.channel.send(":x: No permission!");
    if (msg.guild) {
       let gd = await datastorage.getGuildData(msg.guild.id);
       let modRole = gd.guildData.modRole;
       if (msg.member.roles.get(modRole) == null 
       && cmd.meta.permissionLevel == "modRole") return msg.channel.send(`:x: This is a mod only command! Set the mod role using ${config.prefix}setmodrole <mod role name>`);   
       else if (msg.guild.ownerID != msg.member.user.id 
            && cmd.meta.permissionLevel == "guildOwner") return msg.channel.send(":x: Only guild owners can execute this command");
        else if ( !(msg.guild.ownerID == msg.member.user.id || msg.member.hasPermission("ADMINISTRATOR")) 
        && cmd.meta.permissionLevel == "guildAdmin") return msg.channel.send(":x: Only guild admins or guild owners can use this command.");
    }

    if (msg.guild == null && cmd.meta.guildOnly) return msg.channel.send(":x: Guild only command.");
    
    //make sure we dont block the entire thing.
    (async()=>{
    const table = r.table("cmdusages");
    let curr = await table.get(cmd.meta.name).run(connection);
    if (curr == null) {
        await table.insert({id:cmd.meta.name, count:1}).run(connection);
    } else {
        curr.count++;
        await table.get(cmd.meta.name).update(curr).run(connection);
    }
})();

    try { cmd.run(msg, args, client); } catch (error) {
        msg.channel.send(new MessageEmbed()
        .setColor(0xed1a07)
        .setDescription("There was a error while executing that command. I've reported the error for you.")
        .setAuthor(msg.author.tag,msg.author.avatarURL)
        .setTitle("Cookieblob Error")
        .setTimestamp(new Date())
    ); 
        client.guilds.get("392987506670305281").channels.get("394031699043942400").send(
`:warning: new error :warning:
Stack:
${require("../util").filter(error.stack)}`);
    }
});

(async function(){ // Command explorer
    let commandFileNames = await exploreCommandsFolder();
    let commandModules = loadFileNames(commandFileNames);
    commandModules.forEach((cmdModule)=>{
        if (cmdModule.meta == null) throw Error(`Command module ${cmdModule} did not export 'meta'`);
        if (typeof cmdModule.run != "function") throw Error(`Command module ${JSON.stringify(cmdModule)} did not export 'run' or did not export 'run' as type 'function'`);
        commands[cmdModule.meta.name] = cmdModule;
        console.log(`Loaded command ${cmdModule.meta.name}`);
    });
})().then(()=>{
    client.login(config.token); // Only login after we finished finding commands
});

/**
 * Require all file names and return a array with all of the required modules.
 * @param {Array<String>} arr Array with file names
 * @returns {Array<Object>} The modules 
 */
function loadFileNames(arr) {
    let a = [];
    arr.forEach((b)=>{
        a.push(require("./"+b));
    });
    return a;
}

/**
 * Get all of the file names in the commands folder that end with .cmd.js
 * @returns {Promise<Array>} All file names in the commands folder.
 */
function exploreCommandsFolder(){
    return new Promise((resolve,reject)=>{
        glob("commands/**.cmd.js",(error,matches)=>{
            if (error) reject(error);
            else resolve(matches);
        });
    });
}
/**
 * @typedef {Object} Command
 * @property {Function} run
 * @property {CommandMeta} meta
 */
/**
 * @typedef {Object} CommandMeta
 * @property {String} name
 * @property {String} description
 * @property {Array<String>} usage
 * @property {String} permissionLevel
 * @property {Boolean} guildOnly
 */

/**
 * Get a command (yay better intellisense)
 * @param {String} name 
 * @returns {Command} Command
 */
function getCommand(name) {
    return commands[name];
}

/**
 * @typedef {Object} Config
 * @property {String} token
 * @property {String} prefix 
 * @property {String} ownerID 
 * @property {String} ytKey
 * @property {String} discordbotsorgToken
 * @property {String} botsdiscordpwToken
 */

/**
 * Get the config (intellisense)
 * @returns {Config} The config
 */
function getConfig(){
    return require("./config.json");
}
module.exports = {
    config:config,
    client:client,
    commands:commands,
    getCommand: getCommand,
    exploreCommandsFolder: exploreCommandsFolder
}