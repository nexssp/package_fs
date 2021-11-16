// Nexss PROGRAMMER 2.x - FS/Files
const {
  nxsError,
  nxsInfo,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);
var path = require("path");

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);

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
    Field_Value_1 = NexssStdout.nxsIn[0];
  }
}

function filterEnts(arr, types) {
  if (!Array.isArray(types)) {
    types = types.split(",");
  }

  return arr.filter((e) => {
    return types.includes(path.extname(e));
  });
}

// console.log(filterEnts(["myfile.png", "mysecondfile.xxx"], ".png"));

process.chdir(NexssStdout.cwd);

const {
  promises: { readdir },
} = require("fs");

const getDirectories = async (source, filter) => {
  let dirs = (await readdir(source, { withFileTypes: true }))
    .filter((dirent) => !dirent.isDirectory())
    .map((dirent) => dirent.name);

  if (filter) {
    dirs = filterEnts(dirs, filter);
  }

  NexssStdout["nxsOut"] = dirs;

  delete NexssStdout.resultField_1;
  delete NexssStdout.nxsIn;
  process.stdout.write(JSON.stringify(NexssStdout));
};

let inFileTypes = NexssStdout._inFileTypes;

(() => {
  if (inFileTypes && !Array.isArray(inFileTypes)) {
    inFileTypes = [inFileTypes];
  }

  getDirectories(Field_Value_1, inFileTypes);
})();
