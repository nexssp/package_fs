const {
  nxsError,
  nxsInfo,
  nxsWarn,
  nxsOk,
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);
const {
  existsSync,
  mkdirSync,
  copyFileSync,
  lstatSync,
  unlinkSync,
  constants,
} = require("fs");
const { COPYFILE_EXCL } = constants;
const { resolve, join, basename } = require("path");
const copydir = require("copy-dir");

const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
let NexssStdout = NexssIn();

if (!Array.isArray(NexssStdout.nxsIn)) {
  NexssStdout.nxsIn = [NexssStdout.nxsIn];
}

process.chdir(NexssStdout.cwd);

// Check first if they exists, _force for ommiting checking
let fromCopy = [];
if (!NexssStdout._force) {
  for (let x = 0; x < NexssStdout.nxsIn.length; x++) {
    iterator = NexssStdout.nxsIn[x];
    let fullPath = resolve(iterator);

    if (!existsSync(fullPath)) {
      nxsError(`Folder/File '${iterator}' does not exist.`);
      nxsInfo(`Your current path is: ${process.cwd()}`);
      process.exit(1);
    } else {
      fromCopy.push(fullPath);
    }
  }
}

NexssStdout._destination = (NexssStdout._destination + "").split(",");
if (
  NexssStdout._destination.length !== 1 &&
  fromCopy.length !== NexssStdout._destination.length
) {
  nxsError(
    `_destination can be only one field or the same amount as sources separated by commas`
  );
  nxsInfo(`nexss FS/Copy help for more`);
  process.exit(1);
}

let prepared = [];
for (let x = 0; x < fromCopy.length; x++) {
  const src = fromCopy[x];
  const dst = NexssStdout._destination[x] || NexssStdout._destination[0];
  prepared.push({ src, dst });
}

const inspect = require("util").inspect;

if (NexssStdout._dry) {
  nxsInfo(`_dry option enabled, nothing will be copied.`);
  console.log(inspect(prepared));
  NexssStdout.nxsStop = true;
  process.stdout.write(JSON.stringify(NexssStdout));
  process.exit(0);
}
let rimraf;
if (NexssStdout._delete) {
  if (!NexssStdout._sure) {
    nxsError(
      `To delete sources during copy you MUST put --_delete and --_sure`
    );
    NexssStdout.nxsStop = true;
    process.stdout.write(JSON.stringify(NexssStdout));
    process.exit(0);
  }
  rimraf = require("rimraf");
}

for (const iterator of prepared) {
  nxsInfo(`FS/Copy: Processing: ${inspect(iterator)}`);
  let fullPathDestination = resolve(iterator.dst);
  if (lstatSync(iterator.src).isDirectory()) {
    fullPathDestination = join(fullPathDestination, basename(iterator.src));

    if (!existsSync(fullPathDestination)) {
      nxsWarn(
        `Folder/File '${fullPathDestination}' does not exist. Creating it..`
      );
      mkdirSync(fullPathDestination, { recursive: true });
    }

    options = {};
    options.cover = false;
    copydir.sync(iterator.src, fullPathDestination, options);
    if (NexssStdout._delete && NexssStdout._sure) {
      rimraf.sync(iterator.src);
      nxsOk(`Folder ${iterator.src} has been deleted.`);
    }
  } else {
    const filename = basename(iterator.src);
    copyFileSync(iterator.src, join(iterator.dst, filename));
    if (NexssStdout._delete && NexssStdout._sure) {
      unlinkSync(iterator.src);
      nxsOk(`File ${iterator.src} has been deleted.`);
    }
  }
}

delete NexssStdout.nxsIn;
delete NexssStdout.resultField_1;
process.stdout.write(JSON.stringify(NexssStdout));
