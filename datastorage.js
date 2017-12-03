const r = require('rethinkdb');
let connection = require("./cookieblob").rethinkConnection;
let guildDataClassInstances = {};
let guilds = r.table("guildData");
const updateLocalConnection = (cnct)=>{
    connection = cnct;
}
/**
 * Class for guild data.
 */
class GuildData {
    /**
     * New guild data class
     * @param {String} guildID 
     */
    constructor(guildID) {
        this.ready = new Promise((resolve, reject)=>{
            this.guildData = null;
            this.guildID = guildID;
            this.updateFromDB().then(()=>{
                if (this.guildData == null) this.makeDefaultSettings();
            }).then(resolve).catch(reject);
        });
    }
    /**
     * Get all of the updates from the database.
     */
    async updateFromDB() {
        this.guildData = await guilds.get(this.guildID).run(connection);
        console.log('get',this.guildID, this.guildData);
    }
    /**
     * Send all of our updates to the database, if there are any.
     */
    async updateToDB() {
        let result = await guilds.get(this.guildID).update(this.guildData).run(connection);
        console.log('update',this.guildID, result, this.guildData);
        return result;
    }
    /**
     * Set all of the guild data back to default. THIS WILL WIPE ALL OLD GUILD DATA.
     */
    async makeDefaultSettings() {
        this.guildData = {
            id:this.guildID,
            modRole:"", //setmodrole for this
        };
        await this.updateToDB();
    }
}
/**
 * Get a instance of GuildData
 * @param {String} guildID
 * @returns {GuildData} Guild data class instance 
 */
async function getGuildData(guildID) {
    if (guildDataClassInstances[guildID] == null)  {
        let gd = new GuildData(guildID);
        await gd.ready;
        guildDataClassInstances[guildID] = gd;
    }
    return guildDataClassInstances[guildID];
}
async function setupDatabase() {
    await r.dbCreate("cookieblob").run(connection);
    await r.db("cookieblob").tableCreate("guildData").run(connection);
}
module.exports = {
    getGuildData: getGuildData,
    setupDatabase: setupDatabase,
    updateLocalConnection: updateLocalConnection
}