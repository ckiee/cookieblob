const Enmap = require("enmap");
const EnmapRethink = require("enmap-rethink");

// Guild data
const guildDataRethink = new EnmapRethink({name:"guildData"});
const guildData = new Enmap({provider:guildDataRethink});
