const assert = require('assert');
const CommandLoader = require("../src/CommandLoader");
const Config = require("../src/Config");
describe("cookieblob", () => {
    // testing commits
    it("should load all of the commands in the commands directory", (done) => {
        CommandLoader().then((results) => {
            if (results.get("ping").name == "ping") done();
            else done("the ping command was not present with the proper values.");
        }).catch(done);
    });
    it("should make a config class instance with info", done => {
        const c = new Config({hello: "this should not exist", discordToken:"fake token"});
        if (typeof c.hello != "undefined") done("the hello property should not exist.");
        else if (typeof c.discordToken != "string") done("the discordToken property should be of type string.");
        else if (c.discordToken != "fake token") done("the discordToken property should equal 'fake token'");
        else done();
    });
});