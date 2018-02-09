const { formatAmount, formatDate, camelCaseToNormalCase } = require('./format');
const columnPadding = 5;

function printAccount(nameColumnWidth, amountLength, account) {
  const name = account.name.padEnd(nameColumnWidth);
  const amount = formatAmount(account.balance).padStart(amountLength);
  console.log(`${name}${amount}`);
}

function printAccounts(accounts) {
  const nameLength = accounts.items.reduce(
    (acc, cur) => (cur.name.length > acc ? cur.name.length : acc),
    0
  );
  const amountLength = accounts.items.reduce(
    (acc, cur) =>
      formatAmount(cur.balance).length > acc
        ? formatAmount(cur.balance).length
        : acc,
    0
  );
  accounts.items.forEach(account =>
    printAccount(nameLength + columnPadding, amountLength, account)
  );
}

function printTransaction(transaction, amountLength) {
  const date = formatDate(new Date(transaction.accountingDate)).padEnd(15);
  const text = (transaction.text.length > 50
    ? transaction.text.slice(0, 49) + '…'
    : transaction.text.slice(0, 50)
  ).padEnd(55);
  const amount = formatAmount(transaction.amount).padStart(amountLength);
  console.log(`${date}${text}${amount}`);
}

function printTransactions({ availableItems, items }) {
  const from = new Date(items[items.length - 1].accountingDate);
  const to = new Date(items[0].accountingDate);
  const number = availableItems;
  console.log(
    `${number} transactions between ${formatDate(from)} and ${formatDate(to)}`
  );
  const amountLength = items.reduce(
    (acc, cur) =>
      formatAmount(cur.amount).length > acc
        ? formatAmount(cur.amount).toString().length
        : acc,
    0
  );
  items.forEach(transaction => printTransaction(transaction, amountLength));
}

function printAccountInfoLine(key, value, keyLength, valueLength) {
  value = value.toString();
  console.log(
    `${camelCaseToNormalCase(key).padEnd(keyLength)}${value.padStart(
      valueLength + columnPadding
    )}`
  );
}

function printAccountInfo({ item }) {
  const keys = Object.keys(item);
  const { keyLength, valueLength } = keys.reduce(
    (acc, key) => {
      return {
        keyLength: acc.keyLength > key.length ? acc.keyLength : key.length,
        valueLength:
          acc.valueLength > (item[key] + '').length
            ? acc.valueLength
            : (item[key] + '').length
      };
    },
    { keyLenght: 0, valueLength: 0 }
  );

  keys.forEach(key =>
    printAccountInfoLine(key, item[key], keyLength, valueLength)
  );
}

module.exports = {
  printAccounts,
  printTransactions,
  printAccountInfo
};
