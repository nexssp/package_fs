// Nexss PROGRAMMER 2.0.0 - FS/Get
const {
  nxsError,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);

// console.log(JSON.stringify());

let NexssStdout = NexssIn();

const tmpDir = require("os").tmpdir();

const { sep } = require("path");
require("fs").mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
  if (err) throw err;
  // console.log(directory);
  process.chdir(NexssStdout.cwd);
  NexssStdout[NexssStdout.resultField_1] = directory;
  delete NexssStdout.resultField_1;
  delete NexssStdout.nxsIn;
  process.stdout.write(JSON.stringify(NexssStdout));
});
