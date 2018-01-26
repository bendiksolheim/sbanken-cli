const path = require('path');
const fs = require('fs');

const configFilename = '.sbconfig';
const home = process.env.HOME;

const configPath = path.resolve(home, configFilename);

function load() {
  if (!fs.existsSync(configPath)) {
    return;
  }

  return JSON.parse(fs.readFileSync(configPath));
}

module.exports = {
  load
};
