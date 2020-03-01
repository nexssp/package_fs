// Nexss PROGRAMMER 2.0.0 - FS/Get
const { getFiles } = require("../lib/files");
const {
  nxsError
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);

console.log(NexssIn());

// Modify data
//NexssStdout.NodeJSOutput = `Hello from NodeJS! ${process.version}`;
//   let fieldOut = "nxsOut";
//   if (NexssStdout.nxsOutAs) {
//     fieldOut = NexssStdout.nxsOutAs;
//   }

//   NexssStdout[fieldOut] = getFiles(Field_Value_1);
//   // STDOUT
//   process.stdout.write(JSON.stringify(NexssStdout));
// });
