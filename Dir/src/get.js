// Nexss PROGRAMMER 2.0.0 - FS/Get
const { getFiles } = require("../lib/files");
const {
  nxsError
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);

// console.log(JSON.stringify());

let NexssStdout = NexssIn();

if (NexssStdout.FSGetPath) {
  Field_Value_1 = NexssStdout.FSGetPath;
  delete NexssStdout.FSGetPath;
} else {
  if (!NexssStdout.nxsIn) {
    nxsError(
      "You need to provide path. Or with parameter as Nexss FS/Get param OR nxsIn OR --FSGetPath"
    );
    process.exit(0);
  } else {
    NexssStdout.nxsIn[0];
  }
}

// Modify data
//NexssStdout.NodeJSOutput = `Hello from NodeJS! ${process.version}`;
//   let fieldOut = "nxsOut";
//   if (NexssStdout.nxsOutAs) {
//     fieldOut = NexssStdout.nxsOutAs;
//   }
process.chdir(NexssStdout.cwd);
NexssStdout[NexssStdout.resultField_1] = getFiles(NexssStdout.nxsIn[0]);
delete NexssStdout.resultField_1;
delete NexssStdout.nxsIn;
process.stdout.write(JSON.stringify(NexssStdout));
