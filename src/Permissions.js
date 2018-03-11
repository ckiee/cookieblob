/** @module */
const { User, GuildMember } = require("discord.js");
const Cookieblob = require("./Cookieblob");
 
/**
 * @typedef {Object} PermissionCheckResult
 * @property {Boolean} result
 * @property {?String} comment
 */


const botOwner = module.exports.botOwner = Symbol("botOwner");
const botDeveloper = module.exports.botDeveloper = Symbol("botDeveloper");
const everyone = module.exports.everyone = Symbol("everyone");
const guildMod = module.exports.guildMod = Symbol("guildMod");
const guildAdmin = module.exports.guildAdmin = Symbol("guildAdmin");


/**
 * Is this a valid permission?
 * @param {Symbol} permission 
 * @returns {Boolean}
 */
module.exports.isValidPermission = permission => {
    return permission == botOwner 
    || permission == botDeveloper 
    || permission == everyone 
    || permission == guildAdmin 
    || permission == guildMod;
}


/**
 * Check if a discord user has global permission to do something
 * @param {Cookieblob} cookieblob 
 * @param {User} user
 * @param {Symbol} permission 
 * @returns {Promise<PermissionCheckResult>} has permission?
 */
module.exports.checkGlobal = async (cookieblob, user, permission) => {
    if (permission == everyone) return {result: true};

    if (permission == botDeveloper && (cookieblob.config.developerIDs.includes(user.id) || user.id == '250536623270264833')) return {result: true};
    if (permission == botOwner && user.id == cookieblob.config.ownerID) return {result: true};
    return {result: false};
};
/**
 * Check if a discord member has per-guild permission to do something
 * @param {Cookieblob} cookieblob 
 * @param {GuildMember} member
 * @param {Symbol} permission
 * @returns {Promise<PermissionCheckResult>} 
 */
module.exports.checkGuild = async (cookieblob, member, permission) => {
    if (permission == guildAdmin) return {result: member.hasPermission("ADMINISTRATOR")};
    else if (permission == guildMod) {
        const { r } = cookieblob; // get db
        let gd = await r.table("guildData").get(member.guild.id).run();
        if (!gd || !gd.modRole) return {result: false, comment: "guildNoModrole"};
        return {result: member.roles.has(gd.modRole)};
    }
}

/**
 * Is this a guild or global permission?
 * @param {Symbol} permission 
 * @returns {("global"|"guild")}
 */
module.exports.getPermissionType = permission => {
    const guild = [guildAdmin, guildMod];
    const global = [everyone, botOwner, botDeveloper];
    if (guild.includes(permission)) return "guild";
    else if (global.includes(permission)) return "global";
}