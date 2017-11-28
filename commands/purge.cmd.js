module.exports = {
    run: async (msg, args, client) => {
        msg.channel.send("You have permission!");
    },
    meta: {
        name: "purge",
        description: "Purge messages.",
        usage: ["amount"],
        permissionLevel:"modRole"
    }
}