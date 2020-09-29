const {
  nxsError,
  nxsInfo,
  nxsWarn,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();
const example =
  " eg. nexss FS/Link /usr/bin/mylink /this/is/my/destination/file";
if (!NexssStdout.nxsIn) {
  nxsError(`Enter Link and Destination\n${example}`);
  NexssStdout.nxsStop = true;
  process.stdout.write(JSON.stringify(NexssStdout));
}

if (NexssStdout.nxsIn.length < 2) {
  nxsError(`Enter destination which Links points to.\n${example}`);
  NexssStdout.nxsStop = true;
  process.stdout.write(JSON.stringify(NexssStdout));
}
const fs = require("fs");

const source = `${NexssStdout.cwd}/${NexssStdout.nxsIn[0]}`;
const destination = `${NexssStdout.cwd}/${NexssStdout.nxsIn[1]}`;

if (!fs.existsSync(destination)) {
  nxsError(`Destination not found: ${destination}.`);
  NexssStdout.nxsStop = true;
  process.stdout.write(JSON.stringify(NexssStdout));
}

fs.symlinkSync(destination, source);

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
process.stdout.write(JSON.stringify(NexssStdout));
