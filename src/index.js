#!/usr/bin/env node
const conf = require('./config');
const api = require('./api');
const print = require('./print');
const args = require('./arguments');

async function balance(config) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    print.printAccounts(accounts);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function transactions(config, account) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    const transactions = await api.transactions(
      accessToken,
      config.customerId,
      accounts.items,
      account
    );
    print.printTransactions(transactions);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function accountInfo(config, account) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    const accountInfo = await api.accountInfo(accessToken, config.customerId, accounts.items, account);
    print.printAccountInfo(accountInfo);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

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
const programArguments = process.argv.slice(2);
parse(programArguments);
