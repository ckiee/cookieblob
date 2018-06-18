const fs = require("fs");
const fn = process.argv[process.argv.length-1];
let contents = fs.readFileSync(fn).toString();
contents = contents.split(`'`).join("`");
contents = contents.split(`"`).join("`");
fs.writeFileSync(fn, contents);
console.log("styled "+fn);