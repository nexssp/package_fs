const {
  nxsError,
  nxsInfo,
  nxsWarn,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();
const example =
  " eg. nexss FS/Link /usr/bin/mylink /this/is/my/destination/file";
if (!NexssStdout.nxsIn || NexssStdout.nxsIn === "undefined") {
  nxsError(`Enter Link and Destination\n${example}`);
  process.stdout.write(JSON.stringify(NexssStdout));
  process.exit(1);
}

if (NexssStdout.nxsIn.length < 2) {
  nxsError(`Enter destination which Links points to.\n${example}`);
  // NexssStdout.nxsStop = true;
  // process.stdout.write(JSON.stringify(NexssStdout));
  process.exitCode = 1;
  return;
}
const fs = require("fs");

let source = `${
  NexssStdout.nxsIn[0].startsWith("./")
    ? NexssStdout.nxsIn[0].substring(2)
    : NexssStdout.nxsIn[0]
}`;
let destination = `${
  NexssStdout.nxsIn[1].startsWith("./")
    ? NexssStdout.nxsIn[1].substring(2)
    : NexssStdout.nxsIn[1]
}`;

if (!require("path").isAbsolute(destination)) {
  destination = `${NexssStdout.cwd}/${destination}`;
}

if (!require("path").isAbsolute(source)) {
  source = `${NexssStdout.cwd}/${source}`;
}

if (!fs.existsSync(destination)) {
  nxsError(`Destination not found: ${destination}.`);
  // NexssStdout.nxsStop = true;
  // process.stdout.write(JSON.stringify(NexssStdout));

  process.exitCode = 1;
  return;
}

fs.symlinkSync(destination, source);

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
process.stdout.write(JSON.stringify(NexssStdout));
