const request = require("request");
module.exports = {
    run: async (msg, args, client) => {
        request("https://catfact.ninja/fact",(error, response, body)=>{
            if (error) {
                msg.channel.send(":x: there was an error while getting your fact");
                throw error;
            }
            let j = JSON.parse(body);
            msg.channel.send(`:ok_hand: Fact: *${j.fact}*`);
        });
    },
    meta: {
        name: "catfact",
        description: "Show a random cat fact!",
        usage: [],
        permissionLevel:0,
        guildOnly:false
    }
}