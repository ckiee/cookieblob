const r = require('rethinkdb');
let guildDataClassInstances = {};
/**
 * Class for guild data.
 */
class GuildData {
    /**
     * New guild data class
     * @param {String} guildID 
     */
    constructor(guildID) {
        this.guildData = null;
        this.guildID = guildID;
        this.updateFromDB();
        if (this.guildData == null) this.makeDefaultSettings();
    }
    /**
     * Get all of the updates from the database.
     */
    updateFromDB() {

    }
    /**
     * Send all of our updates to the database, if there are any.
     */
    updateToDB() {
        
    }
    /**
     * Set all of the guild data back to default. THIS WILL WIPE ALL OLD GUILD DATA.
     */
    makeDefaultSettings() {
        this.guildData = {
            id:this.guildID,
            modRole:"", //setmodrole for this
        };
        this.updateToDB();
    }
}
/**
 * Get a instance of GuildData
 * @param {String} guildID
 * @returns {GuildData} Guild data class instance 
 */
function getGuildData(guildID) {
    if (guildDataClassInstances[guildID] == null) guildDataClassInstances[guildID] = new GuildData(guildID);
    return guildDataClassInstances[guildID];
}
module.exports = {
    getGuildData: getGuildData
}