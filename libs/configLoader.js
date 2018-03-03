var fs = require("fs");
JSON.minify = JSON.minify || require("node-json-minify");

function foo(relativePath) {
  // give preference to environment variable
  if (process.env.NOMP_CONFIG) {
    console.log("returning config for env var NOMP_CONFIG");
    return process.env.NOMP_CONFIG;
  } else if (fs.existsSync(relativePath)) {
    console.log('returning config for ' + relativePath);
    return JSON.parse(
      JSON.minify(fs.readFileSync(relativePath, { encoding: "utf8" }))
    );
  } else {
      console.error("env var NOMP_CONFIG and config.json file do not exist. Read the installation/setup instructions.")
    throw Error(
      "env var NOMP_CONFIG and config.json file do not exist. Read the installation/setup instructions."
    );
  }
}

module.exports.load = function() {
  return foo("config.json");
};

module.exports.load = function(relativePath) {
  return foo(relativePath);
};
