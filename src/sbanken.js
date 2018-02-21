const api = require('./api');
const print = require('./print');

function findAccount(accounts, account) {
  const acc = accounts.find(a => a.name === account);
  if (!acc) {
    console.error(
      `Account '${account}' not found. Available accounts: ${accounts
        .map(a => a.name)
        .join(', ')}`
    );
    process.exit(1);
  }

  return acc;
}

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

async function transactions(config, accountName) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    const account = findAccount(accounts.items, accountName);
    const transactions = await api.transactions(
      accessToken,
      config.customerId,
      account
    );
    print.printTransactions(transactions);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function accountInfo(config, accountName) {
  try {
    const accessToken = await api.accessToken(config.clientId, config.password);
    const accounts = await api.accounts(accessToken, config.customerId);
    const account = findAccount(accounts.items, accountName);
    const accountInfo = await api.accountInfo(
      accessToken,
      config.customerId,
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
    const fromAccount = findAccount(accounts.items, from);
    const toAccount = findAccount(accounts.items, to);
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
