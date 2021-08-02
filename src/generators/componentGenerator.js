const {
  existsSync,
  outputFileSync,
  appendFileSync,
  readFileSync,
  appendFile,
  createWriteStrea,
} = require("fs-extra");
const fs = require("fs");

const template = require("../templates/functionalComponentTemplate");
const reducerTemplate = require("../templates/reducerTemplate");

const classTemplate = require("../templates/classComponentTemplate");
const chalk = require("chalk");

function componentGenerator(args, program) {
  const componentCommand = program
    .command("component [names...]")
    .alias("c")

    // Static component command option defaults.

    .option(
      "-p, --path <path>",
      "The path where the component will get generated in.",
      "src/components"
    )
    .option(
      "-t, --type <type>",
      "You can pass a component type that you have configured in your GRC config file.",
      "default"
    );

  // Component command action.

  componentCommand.action((componentNames, cmd) => {
    return componentNames.forEach((componentName) => {
      if (!existsSync(`${cmd.path}/${componentName}.jsx`)) {
        if (cmd.type == "default" || cmd.type == "functional") {
          outputFileSync(`${cmd.path}/${componentName}.jsx`, template);
        } else {
          outputFileSync(`${cmd.path}/${componentName}.jsx`, classTemplate);
        }
        console.log(
          chalk.greenBright.bold(
            `Hurray!!! The Component successfully create at ${cmd.path} :)`
          )
        );
      } else {
        console.error(
          chalk.red.bold(
            "ERROR: It looks like The component already exist with this name"
          )
        );
        return process.exit(1);
      }
    });
  });
}
module.exports = {
  componentGenerator,
};
