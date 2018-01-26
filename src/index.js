#!/usr/bin/env node
const conf = require('./config');
const api = require('./api');
const print = require('./print');

function showAccountInfo(config) {
  api
    .accessToken(config.clientId, config.password)
    .then(accessToken => {
      return api.accounts(accessToken, config.customerId);
    })
    .then(print.printAccounts)
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}

const config = conf.load();
if (!config) {
  console.error('Could not find config file (.sbconfig) in home folder');
  process.exit(1);
}

showAccountInfo(config);
