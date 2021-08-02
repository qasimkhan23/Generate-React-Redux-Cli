const {
  existsSync,
  outputFileSync,
  appendFileSync,
  readFileSync,
  appendFile,
  createWriteStrea,
} = require("fs-extra");
const fs = require("fs");

const reducerTemplate = require("../templates/reducerTemplate");
const rootReducerTemplate = require("../templates/rootReducerTemplate");

const chalk = require("chalk");
function reducerGenerator(args, program) {
  const reducerCommand = program
    .command("reducer [names...]")
    .alias("r")

    // Static component command option defaults.

    .option(
      "-p, --path <path>",
      "The path where the reducer will get generated in.",
      "src/reducers"
    );

  // Component command action.

  reducerCommand.action((reducerNames, cmd) => {
    return reducerNames.forEach((reducerName) => {
      if (!existsSync(`${cmd.path}/${reducerName}.js`)) {
        if (!existsSync(`${cmd.path}/rootReducer.js`)) {
          outputFileSync(`${cmd.path}/rootReducer.js`, rootReducerTemplate);
        }
        const redu = readFileSync(`${cmd.path}/rootReducer.js`);
        var logStream = fs.createWriteStream(`${cmd.path}/rootReducer.js`, {
          flags: "w",
        });
        logStream.write(
          "\r\n" + `import ${reducerName} from "./${reducerName}.js"` + "\r\n"
        );
        var logStreamNew = fs.createWriteStream(`${cmd.path}/rootReducer.js`, {
          flags: "a",
        });
        logStreamNew.write("\r\n" + redu + "\r\n");

        outputFileSync(`${cmd.path}/${reducerName}.js`, reducerTemplate);
        console.log(
          chalk.greenBright.bold(
            `Hurray!!! The Reducer successfully create at ${cmd.path} :)`
          )
        );
        console.log(
          chalk.yellowBright.bold(
            "The cli will auto import the required files for reducer in src/index.js"
          )
        );
        console.log(
          chalk.yellowBright.bold(
            "If you don't have this src/index.js file, you have to make the imports manually"
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
  reducerGenerator,
};
