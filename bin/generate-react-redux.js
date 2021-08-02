#!/usr/bin/env node
const clear = require("clear");
const program = require("commander");
const pkg = require("../package.json");
const { componentGenerator } = require("../src/generators/componentGenerator");
const { reducerGenerator } = require("../src/generators/reducerGenerator");
const { actionGenerator } = require("../src/generators/actionGenerator");

const { storeGenerator } = require("../src/generators/storeGenerator");

const { getCLIfile } = require("../src/utils/index");

const isValidNodeVersion = () => {
  const version = process.versions.node;

  const split = version.split(".");

  if (split[0] < 12) {
    console.error(
      // eslint-disable-next-line
      "You are running Node " +
        version +
        " Generate React Redux CLI requires Node 12 or higher. Please update your version of Node."
    );

    return false;
  }
  return true;
};
if (!isValidNodeVersion()) {
  process.exit();
}
clear();

getCLIfile();
componentGenerator(process.argv, program);
reducerGenerator(process.argv, program);
actionGenerator(process.argv, program);
storeGenerator(process.argv, program);

program.version(pkg.version);
program.parse(process.argv);
