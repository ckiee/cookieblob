'use strict';
/** @module cookieblob */
const Discord = require("discord.js");
const RichEmbed = Discord.RichEmbed;
const client = new Discord.Client();
const config = getConfig();
const glob = require("glob");
let commands = {};
require("./datastorage.js");
client.on('ready',()=>{
    console.log(`Logged in as ${client.user.tag}`);
});
client.on('message', msg => { // Command handler on-message listener
    if (msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(config.prefix)) return; 
    let uiCmd = msg.content.toLowerCase().split(" ")[0].slice(config.prefix.length); // ui stands for 'User Inputted' here
    let cmd = getCommand(uiCmd);
    let args = msg.content.split(" ").slice(1);
    if (cmd == null) return;
    if (cmd.meta.permissionLevel == "botOwner" && msg.author.id != config.ownerID) return msg.channel.send(":x: No permission!");
    if (msg.guild) {
       let modRole = require("./datastorage").getGuildData(msg.guild.id).guildData.modRole;
       if (msg.member.roles.find("name",modRole) == null 
       && cmd.meta.permissionLevel == "modRole") return msg.channel.send(`:x: This is a mod only command! Set the mod role using ${config.prefix}setmodrole <mod role name>`);   
    }
    try { cmd.run(msg, args, client); } catch (error) {
        msg.channel.send(new RichEmbed()
        .setColor(0xed1a07)
        .setDescription("There was a error while executing that command. I've reported the error for you.")
        .setAuthor(msg.author.tag,msg.author.avatarURL)
        .setTitle("Cookieblob Error")
        .setTimestamp(new Date())
    );

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