const api = require('./api');
const print = require('./print');

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
    const accountInfo = await api.accountInfo(
      accessToken,
      config.customerId,
      accounts.items,
      account
    );
    print.printAccountInfo(accountInfo);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function transfer(config, from, to, amount, message) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    const fromAccount = accounts.items.find(a => a.name === from);
    const toAccount = accounts.items.find(a => a.name === to);
    const response = await api.transfer(
      accessToken,
      config.customerId,
      fromAccount.accountNumber,
      toAccount.accountNumber,
      amount,
      message
    );
    if (response.isError) {
      console.error(
        `Failed trying to transfer ${amount} from '${from}' to '${to}': ${
          response.errorMessage
        }`
      );
    } else {
      const balance = await api.accounts(accessToken, config.customerId);
      print.printAccounts(balance);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = { balance, transactions, accountInfo, transfer };
