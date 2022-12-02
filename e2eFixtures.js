const { exec, execFileSync, execSync } = require("child_process");

const args = process.argv.slice(2);
execSync("chmod +x ./e2eFixtures.sh");
exec(`./e2eFixtures.sh ${args[0]}`, function (error, stdout, stderr) {
  if (error !== null) {
    console.log("exec error: " + error);
  }
  console.log(stdout);
});
