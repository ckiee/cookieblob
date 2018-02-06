/** @module */
const { User, GuildMember } = require("discord.js");
const Cookieblob = require("./Cookieblob");
 
const botOwner = module.exports.botOwner = Symbol("botOwner");
const botDeveloper = module.exports.botDeveloper = Symbol("botDeveloper");
const everyone = module.exports.everyone = Symbol("everyone");

/**
 * Is this a valid permission?
 * @param {Symbol} permission 
 * @returns {Boolean}
 */
module.exports.isValidPermission = permission => {
    return permission == botOwner || permission == botDeveloper || permission == everyone;
}

/**
 * Check if a discord user has global permission to do something
 * @param {Cookieblob} cookieblob 
 * @param {User} user
 * @param {Symbol} permission 
 * @returns {Boolean} has permission?
 */
module.exports.checkGlobal = (cookieblob, user, permission) => {
    if (permission == everyone) return true;

    if (permission == botDeveloper && cookieblob.config.developerIDs.includes(user.id)) return true;
    if (permission == botOwner && user.id == cookieblob.config.ownerID) return true;
    return false;
};
/**
 * Check if a discord member has global permission to do something
 * @param {Cookieblob} cookieblob 
 * @param {GuildMember} member 
 */
module.exports.checkGuild = (cookieblob, member) => {
    
}
