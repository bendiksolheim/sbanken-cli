const path = require('path');
const fs = require('fs');
const api = require('./api');
const print = require('./print');

const configFile = '.sbconfig';
const home = process.env.HOME;

const configPath = path.resolve(home, configFile);
if (!fs.existsSync(configPath)) {
  console.error('Could not find config file in home folder');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath));

api
  .getAccessToken(config.clientId, config.password)
  .then(accessToken => {
    return api.accounts(accessToken, config.customerId);
  })
  .then(print.printAccounts)
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
