#!/usr/bin/env node
const conf = require('./config');
const api = require('./api');
const print = require('./print');
const args = require('./arguments');

function balance(config) {
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

const parse = args.create({ balance: balance.bind(null, config) });
const programArguments = process.argv.slice(2);
parse(programArguments);
