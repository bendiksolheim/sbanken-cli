#!/usr/bin/env node
const conf = require('./config');
const args = require('./arguments');
const { balance, transactions, accountInfo } = require('./sbanken');

const config = conf.load();
if (!config) {
  console.error('Could not find config file (.sbconfig) in home folder');
  process.exit(1);
}

const parse = args.create({
  balance: () => balance(config),
  transactions: account => transactions(config, account),
  account: account => accountInfo(config, account)
});

parse(process.argv.slice(2));
