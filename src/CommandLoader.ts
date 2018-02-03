import Cookieblob from "./Cookieblob";
import Command from "./Command";
import * as glob from "glob";
function loadAllCmds(cookieblob: Cookieblob): Promise<Map<String, Command>> {
    return new Promise((resolve, reject) => {
        const map = new Map();
        glob("src/commands/**.cmd.js", (error: Error, matches: string[]) => {
            if (error) return reject(error);
            matches.map(function(fn): Command{
                try {
                    return require(`${process.cwd()}/${fn}`);
                } catch (error) {
                    if (cookieblob) cookieblob.emit("debug", `Failed to load '${process.cwd()}/${fn}', error: ${error.stack}`);
                    return;
                }
            }).filter(v => !(v instanceof Error)).forEach(v => map.set(v.name, v));
            resolve(map);
        });
    });
}
export default loadAllCmds