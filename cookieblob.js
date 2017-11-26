const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
let commands = {};
client.login(config.token);
client.on('ready',()=>{
    console.log(`Logged in as ${client.user.tag}`);
});

module.exports = {
    config:config,
    client:client,
    commands:commands
}