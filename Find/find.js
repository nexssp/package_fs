const {
  nxsError,
  nxsInfo,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();

process.chdir(NexssStdout.cwd);

if (!NexssStdout.nxsIn) {
  nxsError("Enter phrase to search eg Nexss FS/Find invoice");
  process.exit(1);
}

const { spawnSync } = require("child_process");
const { normalize } = require("path");
// execSync("rg " + NexssStdout.nxsIn.join(" "));
// --after-context=11 --before-context=10
var rg = spawnSync("rg", [...NexssStdout.nxsIn, "-i", "--json"], {
  encoding: "utf8",
});



// nxsInfo(`Run rg ${NexssStdout.nxsIn}`);

NexssStdout.nxsOut = rg.stdout
  .trim()
  .split("\n")
  .filter((match) => {
    let data = JSON.parse(match);
    if (data.type === "match") {
      return match;
    }
  })
  .map((a) => JSON.parse(a))
  .map((e) => normalize(e.data.path.text));

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
delete NexssStdout.storageFilename;
process.stdout.write(JSON.stringify(NexssStdout));
