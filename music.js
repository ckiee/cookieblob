const cookieblob = require("./cookieblob");
let guilds = {};
const ytdl = require("ytdl-core");
const search = require('youtube-search');
var searchoptions = {
    maxResults: 1,
    key: cookieblob.config.ytKey,
    type:"video",
    safeSearch:"none"
};

async function play() {

}