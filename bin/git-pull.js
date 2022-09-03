#! /usr/bin/env node

const { execSync } = require("child_process");

const gitVersion = execSync("git --version").toString();
console.log("using:", gitVersion);

const currentBranch = execSync("git branch --show-current")
  .toString()
  .split("\n")[0];
const backupBranch =
  currentBranch + "-backup-gpull" + (Math.random() * 10000).toFixed(0);

console.log("⚙️  force pulling...");
const stashOutput = execSync("git stash -u").toString();
execSync("git checkout -b " + backupBranch);
execSync("git branch -D " + currentBranch);
execSync("git fetch");
execSync("git checkout " + currentBranch);
if (stashOutput !== "No local changes to save\n") {
  execSync("git stash pop");
}

console.log("✅ done.");
console.log(
  "to switch to backup branch, run: \n\ngit checkout " + backupBranch + "\n"
);
