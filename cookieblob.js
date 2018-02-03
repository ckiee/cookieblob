'use strict';
/** @module cookieblob */
const {MessageEmbed, Client} = require("discord.js");
const request = require("request");
const client = new Client();
const config = getConfig();
const glob = require("glob");
const r = require('rethinkdb');

(function safetyThings() {
process.on('unhandledRejection', error => {
    console.error(error.stack);
});
process.stdin.resume();
process.on('SIGINT', function () {
  console.log("Safely destroyed discord client!");
  client.destroy();
  process.exit();
});
})();

// Rethonk and datastorage
const datastorage = require("./datastorage");
let connection; 
r.connect({db:"cookieblob"}).then(rethinkConnection=>{
    module.exports.rethinkConnection = rethinkConnection;
    datastorage.updateLocalConnection(rethinkConnection);
    connection = rethinkConnection;
});


//DBL & DB.ORG Stats updater
function postBotStats(base, token) {
    if (client.user.id != "324874714646577152") return; // just so i dont have it posting on my local instance.
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




let commands = {};

(()=>{
    const ug = () => {
        console.log("Updating guild status ", `${client.guilds.size} guilds`);
        postStatsOnAllSites();
        client.user.setPresence({activity:{name:`${client.guilds.size} guilds! | ${config.prefix}help`, type:"WATCHING"}});
    }
    const guildNotifyChannel = client.channels.get("397981790142464000");
    client.on('guildCreate', g => {
        guildNotifyChannel.send(`🎉 joined guild \`${g.name}\`(${g.id})`);
        r.table("guildStats").insert({count: client.guilds.size, date: new Date().getTime()}).run(connection);
        ug();
    });
    client.on('guildDelete', g => {
        guildNotifyChannel.send(`🎉 left guild \`${g.name}\`(${g.id})`);
        r.table("guildStats").insert({count: client.guilds.size, date: new Date().getTime()}).run(connection);
        ug();
    });

client.on('ready',()=>{
    console.log(`Logged in as ${client.user.tag}`);
    const site = require("./site/site.js");
    const starboard = require("./starboard");
    ug();
});
})();


client.on('message', async msg => { // Command handler on-message listener
    if (msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(config.prefix)) return; 

    let uiCmd = msg.content.toLowerCase().split(" ")[0].slice(config.prefix.length); // ui stands for 'User Inputted' here
    let cmd = getCommand(uiCmd);
    /**
     * @type {String[]}
     */
    let args = msg.content.split(" ").slice(1);

    if (!cmd) return; // Go away if it isnt a valid command.
    // Global Permission checks
    if (cmd.meta.permissionLevel == "botOwner" && msg.author.id != config.ownerID) return;
    if (cmd.meta.permissionLevel == "botAdmin" && config.admins.indexOf(msg.author.id)== -1) return;
    
    if (msg.guild) {
        //Get that guild
       let gd = await datastorage.getGuildData(msg.guild.id);
       let modRole = gd.guildData.modRole;

       // Guild permissions
       if (!msg.member.roles.get(modRole)
       && cmd.meta.permissionLevel == "modRole") return msg.channel.send(`:x: This is a mod only command! Set the mod role using ${config.prefix}setmodrole <mod role name>`);   
       else if (msg.guild.ownerID != msg.member.user.id 
            && cmd.meta.permissionLevel == "guildOwner") return msg.channel.send(":x: Only guild owners can execute this command");
        else if ( !(msg.guild.ownerID == msg.member.user.id || msg.member.hasPermission("ADMINISTRATOR") || msg.author.id == config.ownerID) 
        && cmd.meta.permissionLevel == "guildAdmin") return msg.channel.send(":x: Only guild admins or guild owners can use this command.");
    }

    if (!msg.guild && cmd.meta.guildOnly) return msg.channel.send(":x: Guild only command.");
    
    //We can quickly get our stats while we're executing the command. This shoulden't block the command from running.
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

    cmd.run(msg, args, client).catch(error => {
        msg.channel.send(`There was an error while executing command '${cmd.meta.name}', I've reported it to the developers.`);
        client.guilds.get("392987506670305281").channels.get("401628765412917249").send(cmd.meta.name + "\n```js\n" + error.stack + "\n```\n0"+
`User ID: ${msg.author.id}, Guild ID: ${msg.guild ? msg.guild.id : "not in a guild"}, Channel ID: ${msg.channel.id} ( #${msg.channel.name} ) startJSONInfo${JSON.stringify({channelId: msg.channel.id, messageId: msg.id})}`); /// last part is for possible future automation
    });
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
    return arr.map(v => require(`./${v}`));
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
 * @property {String} clientSecret
 * @property {String} secretRand
 * @property {Array<String>} admins
 * @property {String} imgurClientID
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
