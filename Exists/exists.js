// Nexss PROGRAMMER 2.x FS/Exists
const {
  nxsError,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);

// console.log(JSON.stringify());

let NexssStdout = NexssIn();
const fileOrFolder = NexssStdout.nxsIn;
const fs = require("fs");
const path = require("path");
let notExistsFiles = [];
let existsFiles = [];
fileOrFolder.forEach((f) => {
  fx = f;
  if (!path.isAbsolute(fx)) {
    fx = path.join(NexssStdout.cwd, fx);
  }
  const exists = fs.existsSync(fx);

  if (!exists) {
    notExistsFiles.push(f);
  } else {
    existsFiles.push(f);
  }
});
if (notExistsFiles.length > 0) {
  // NexssStdout.nxsStopReason = `FS/Exists: File(s)/Folder(s) are not there:\n${notExistsFiles.join(
  //   ", "
  // )}`;
  // NexssStdout.nxsStop = true;
  if (!NexssStdout["notExists"]) {
    NexssStdout["notExists"] = [];
  }
  NexssStdout["notExists"] = notExistsFiles;
}

if (existsFiles.length > 0) {
  NexssStdout[NexssStdout.resultField_1] = existsFiles;
}

delete NexssStdout.resultField_1;
delete NexssStdout.nxsIn;
process.stdout.write(JSON.stringify(NexssStdout));
