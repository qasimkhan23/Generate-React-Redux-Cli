const {
  accessSync,
  constants,
  outputFileSync,
  readFileSync,
} = require("fs-extra");
const chalk = require("chalk");
const figlet = require("figlet");

const getCLIfile = async () => {
  // --- Make sure the cli commands are running from the root level of the project

  try {
    accessSync("./package.json", constants.R_OK);

    // --- Check to see if the config file exists

    try {
      accessSync("./cli.json", constants.R_OK);
      const currentConfigFile = JSON.parse(readFileSync("./cli.json"));
      return currentConfigFile;
    } catch (e) {
      console.log(
        chalk.yellowBright(
          figlet.textSync("Welcome To Generate React Redux Cli", {
            // font: "Ghost",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 90,
            whitespaceBreak: true,
          })
        )
      );
      outputFileSync("cli.json", JSON.stringify({ useJsx: true }, null));
    }
  } catch (error) {
    console.error(
      chalk.red.bold(
        "ERROR: Run the command from the root level of your React project"
      )
    );
    return process.exit(1);
  }
};

module.exports = {
  getCLIfile,
};
