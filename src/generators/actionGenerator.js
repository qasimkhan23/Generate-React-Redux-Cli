const {
  existsSync,
  outputFileSync,
  appendFileSync,
  readFileSync,
  appendFile,
  createWriteStrea,
} = require("fs-extra");

const chalk = require("chalk");
const actionTemplate = require("../templates/actionTemplate");
function actionGenerator(args, program) {
  const actionCommand = program
    .command("action [names...]")
    .alias("a")

    // Static component command option defaults.

    .option(
      "-p, --path <path>",
      "The path where the reducer will get generated in.",
      "src/actions"
    );

  // Component command action.

  actionCommand.action((actionNames, cmd) => {
    return actionNames.forEach((actionName) => {
      if (!existsSync(`${cmd.path}/${actionName}.js`)) {
        outputFileSync(`${cmd.path}/${actionName}.js`, actionTemplate);
        console.error(
          chalk.greenBright.bold(
            `Hurray!!! The Action successfully create at ${cmd.path} :)`
          )
        );
      } else {
        console.error(
          chalk.red.bold(
            "ERROR: It looks like The reducer already exist with this name"
          )
        );
        return process.exit(1);
      }
    });
  });
}
module.exports = {
  actionGenerator,
};
