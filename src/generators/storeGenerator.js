const { existsSync, outputFileSync, readFileSync } = require("fs-extra");
const fs = require("fs");

const storeTemplate = require("../templates/storeTemplate");

const chalk = require("chalk");
function autoImports() {
  if (existsSync(`src/index.js`)) {
    const indexFile = readFileSync(`src/index.js`);
    var logStream = fs.createWriteStream(`src/index.js`, {
      flags: "w",
    });
    if (existsSync(`src/store/index.js`)) {
      logStream.write("\r\n" + `import createStore from "./store"` + "\r\n");
      logStream.write(
        "\r\n" + `import { Provider } from "react-redux"` + "\r\n"
      );
      logStream.write("\r\n" + `// example` + "\r\n");
      logStream.write("\r\n" + `// const store = createStore()` + "\r\n");
      logStream.write(
        "\r\n" +
          `// ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));` +
          "\r\n"
      );
    } else {
      console.error(
        chalk.red.bold(
          "ERROR: It looks like their is no folder named store in 'src' or their is no file with name index.js in  'src/store'"
        )
      );
      console.error(
        chalk.red.bold("Help: import your store file in 'src/index.js' ")
      );
    }
    var logStreamNew = fs.createWriteStream(`src/index.js`, {
      flags: "a",
    });
    logStreamNew.write("\r\n" + indexFile + "\r\n");
  } else {
    console.error(
      chalk.red.bold("ERROR: Their is not file named index.js in 'src'")
    );
    console.error(
      chalk.red.bold(
        "Help: You have to make manual imports in you main entry file'"
      )
    );
  }
}
function storeGenerator(args, program) {
  const storeCommand = program
    .command("store")
    .alias("s")

    // Static component command option defaults.

    .option(
      "-p, --path <path>",
      "The path where the store will get generated in.",
      "src/store"
    );

  // Component command action.

  storeCommand.action((cmd) => {
    if (!existsSync(`${cmd.path}/index.js`)) {
      outputFileSync(`${cmd.path}/index.js`, storeTemplate);

      console.log(
        chalk.greenBright.bold(
          `Hurray!!! The Store successfully create at ${cmd.path} :)`
        )
      );
      autoImports();
    } else {
      console.error(
        chalk.red.bold("ERROR: It looks like The store already exist")
      );

      return process.exit(1);
    }
  });
}
module.exports = {
  storeGenerator,
};
