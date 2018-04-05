/** @module */
const Cookieblob = require("./Cookieblob");
const ytdl = require("ytdl-core");
const { VoiceBroadcast, BroadcastDispatcher } = require("discord.js");
/**
 * @param {Cookieblob} cookieblob 
 */
module.exports = async (cookieblob) => {
    const { r } = cookieblob;
    let bc = cookieblob.createVoiceBroadcast();
    let pos = 0;
    const maxPos = 10;
    /**
     * @type {BroadcastDispatcher}
     */
    let dispatcher;
    async function playSong() {
        const songID = (await r.table("musicRadio").orderBy(r.desc("views")).limit(maxPos).pluck("id").run())[pos].id;
        dispatcher = bc.play(ytdl(songID, {filter: "audioonly"}));
        dispatcher.once("end", async () => {
            if (bc.dispatchers.length === 0) {
                // no one listening, can close.
                cookieblob._radio = undefined;
                dispatcher = undefined;
                bc = undefined; 
                return;
            }
            await playSong();
        });
        pos++;
        if (pos === maxPos) pos = 0;
    }
    playSong();
    return bc;
}
