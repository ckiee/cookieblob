/** @module */
const Cookieblob = require("./Cookieblob");
const { Message } = require("discord.js");
/**
 * @param {Cookieblob} cookieblob 
 * @param {Message} msg
 */
module.exports = async (cookieblob, msg) => {
    if (msg.author.bot || !msg.content.startsWith(cookieblob.config.defaultPrefix)) return;

    
}