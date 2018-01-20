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
                if (this.guildData == null) {
                    this.makeDefaultSettings();
                    guilds.insert(this.guildData).run(connection);
                }
            }).then(resolve).catch(reject);
        });
    }
    /**
     * Get all of the updates from the database.
     */
    async updateFromDB() {
        this.guildData = await guilds.get(this.guildID).run(connection);
    }
    /**
     * Send all of our updates to the database, if there are any.
     */
    async updateToDB() {
        let result = await guilds.get(this.guildID).update(this.guildData).run(connection);
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
    }
}
/**
 * Get a instance of GuildData
 * @param {String} guildID
 * @returns {GuildData} Guild data class instance 
 */
async function getGuildData(guildID) {
    if (!guildDataClassInstances[guildID])  {
        let gd = new GuildData(guildID);
        await gd.ready;
        guildDataClassInstances[guildID] = gd;
    }
    return guildDataClassInstances[guildID];
}
async function setupDatabase() {
    await r.dbCreate("cookieblob").run(connection);
    await r.db("cookieblob").tableCreate("guildData").run(connection);
    await r.db("cookieblob").tableCreate("starboard").run(connection);
    await r.db("cookieblob").tableCreate("guildStats").run(connection);
    await r.db("cookieblob").tableCreate("cmdusages").run(connection);
    await r.db("cookieblob").tableCreate("cookiePoints").run(connection);
}

/**
 * @typedef {Object} CookiePointGuild
 * @property {String} id The Guild's ID
 * @property {Number} points The amount of points they have
 * @property {Number} multiplier Guild point multiplier, defaults to 1 for none.
 */
/**
 * @type {Map<String, CookiePointGuild>}
 */
 const cpProxies = new Map();

/**
 * @param {String} id
 * @returns {Promise<CookiePointGuild>}
 */
async function getCookiePointGuild(id) {
    if (cpProxies.has(id)) {
        return cpProxies.get(id);
    } else {
        const rawData = await r.table("cookiePoints").get(id).run(connection);
        if (!rawData) {
            const defaultData = {id, points: 0, multiplier: 1};
            r.table("cookiePoints").insert(defaultData).run(connection);
            return defaultData;
        }
        cpProxies.set(new Proxy(rawData, {
            set: (obj, property, value) => {
                obj[property] = value; // normal behaviour
                r.table("cookiePoints").get(id).update(obj).run(connection);
            }
        }));
        await getCookiePointGuild(id);
    }
}
module.exports = {
    getGuildData,
    setupDatabase,
    updateLocalConnection,
    getCookiePointGuild
}