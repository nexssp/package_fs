const { statSync, readdirSync, existsSync } = require("fs");
const { join } = require("path");
const {
  nxsError,
  nxsInfo
} = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);
module.exports.getFiles = (inPath, p) => {
  if (!existsSync(inPath)) {
    nxsError(`Folder '${inPath}' does not exist.`);
    nxsInfo(`Your current path is: ${process.cwd()}`);
    process.exit(0);
  }

  let result = [];
  let files = readdirSync(inPath);
  for (var i in files) {
    var curFile = join(inPath, files[i]);
    var curStat = statSync(curFile);
    // if (
    //   fs.statSync(curFile).isFile() &&
    //   fileTypes.indexOf(path.extname(curFile)) != -1
    // ) {
    //   filesToReturn.push(curFile.replace(dir, ""));
    // } else if (fs.statSync(curFile).isDirectory()) {
    // }

    result.push({
      name: files[i],
      path: curFile.replace(p, "").replace(/\\/g, "/"),
      size: curStat.size,
      mtime: curStat.mtime,
      dir: curStat.isDirectory()
    });
  }

  result.sort(function(a, b) {
    var keyA = new Date(a.mtime),
      keyB = new Date(b.mtime);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  return result;
};
