process.stdin.on("data", function (chunk) {
  chunk = chunk.toString();
  let NexssStdout = JSON.parse(chunk);
  const {
    nxsError,
    nxsInfo,
  } = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssLog.js`);
  if (!NexssStdout.resultField_1) {
    NexssStdout.resultField_1 = "nxsOut";
  }
  // const NexssIn = require(`${process.env.NEXSS_PACKAGES_PATH}/Nexss/Lib/NexssIn.js`);
  // let NexssStdout = NexssIn();

  function paramRecognizer(InParam, resultParam, NexssStdout) {
    let r;
    if (NexssStdout[InParam]) {
      if (Array.isArray(NexssStdout[InParam])) {
        r = NexssStdout[InParam].reduce(
          (acc, g) => acc.concat([resultParam, g]),
          []
        );
      } else {
        r = [resultParam, NexssStdout[InParam]];
      }
      delete NexssStdout[InParam];
      return r;
    }
  }

  process.chdir(NexssStdout.cwd);

  // if (!NexssStdout.nxsIn) {
  //   nxsError("Enter phrase to search eg Nexss FS/Find invoice");
  //   process.exit(1);
  // }

  const { spawnSync } = require("child_process");
  const { normalize } = require("path");
  // execSync("rg " + NexssStdout.nxsIn.join(" "));
  // --after-context=11 --before-context=10

  // Parse parameters

  let params = [];
  let where = ".";
  if (!NexssStdout.nxsIn) {
    params = ["--files"];
  } else {
    if (NexssStdout.nxsIn.length > 1) {
      where = NexssStdout.nxsIn.pop();
    }
    params = NexssStdout.nxsIn.reduce((acc, e) => acc.concat(["-e", e]), []);
    params.push("--json");
  }

  let globs = paramRecognizer("pathMatch", "-g", NexssStdout);
  if (globs) {
    params = params.concat(globs);
    delete NexssStdout.pathMatch;
  }

  let types = paramRecognizer("inTypes", "-t", NexssStdout);
  if (types) {
    params = params.concat(types);
    delete NexssStdout.inTypes;
  }

  let notInTypes = paramRecognizer("notInTypes", "-T", NexssStdout);
  if (notInTypes) {
    params = params.concat(notInTypes);
    delete NexssStdout.notInTypes;
  }

  if (!NexssStdout.caseSensitive) {
    params = params.concat("-i");
    delete NexssStdout.caseSensitive;
  }

  if (NexssStdout.inZip) {
    params = params.concat("--search-zip");
    delete NexssStdout.inZip;
  }

  function validateSort(v) {
    const values = "path,modified,accessed,created";
    if (("," + values + ",").substr("+" + v + ",") < 0) {
      throw new Error("Sort can be only: " + values);
    }
  }

  if (NexssStdout.sort) {
    validateSort(NexssStdout.sort);
    params = params.concat(["--sort", NexssStdout.sort]);
    delete NexssStdout.inZip;
  }

  if (NexssStdout.sortr) {
    validateSort(NexssStdout.sortr);
    params = params.concat(["--sortr", NexssStdout.sortr]);
    delete NexssStdout.inZip;
  }

  if (NexssStdout.inPath) {
    params = params.concat(NexssStdout.inPath);
    delete NexssStdout.inPath;
  } else {
    // params = params.concat(".");
  }

  if (NexssStdout.debug || NexssStdout.nxsLearning) {
    nxsInfo("rg " + params.join(" "));
  }

  try {
    var rg = spawnSync("rg", [...params, where], {
      encoding: "utf8",
      maxBuffer: 1024 * 1024 * 1369,
      detached: false,
      shell: process.platform === "win32" ? true : "/bin/bash",
    });
    if (rg.error) {
      console.error(rg.error);
      return;
    }
  } catch (e) {}

  if (!rg.stdout) {
    NexssStdout.nxsStop = true;
    nxsError("There was an error: ripgrep is not installed?");
    process.stdout.write(JSON.stringify(NexssStdout));
  }

  const r = rg.stdout && rg.stdout.trim();

  if (r) {
    result = r.split("\n");

    if (NexssStdout.nxsIn) {
      result = result
        .filter((match) => {
          let data = JSON.parse(match);
          if (data.type === "match") {
            return match;
          }
        })
        .map((a) => JSON.parse(a))
        .map((e) => normalize(e.data.path.text));
    }

    NexssStdout[NexssStdout.resultField_1] = result;
    NexssStdout.FSFindTotal = result ? result.length : 0;
  } else {
    // nxsError("There was an error:");
    NexssStdout.FSFindTotal = 0;
    if (rg.stderr && rg.stderr.startsWith("unrecognized file type:")) {
      nxsInfo(require("child_process").execSync("rg --type-list").toString());
      nxsError("Above is the list of available types. (Ripgrep)");
    } else if (rg.stderr && rg.stderr.indexOf("USAGE:") > -1) {
      nxsError(rg.stderr.split("USAGE:")[0]);
    }
  }

  // nxsInfo(`Write: FS/Find: size: ${r.length}`);

  delete NexssStdout.nxsIn;
  delete NexssStdout.resultField_1;
  process.stdout.write(JSON.stringify(NexssStdout));
});
