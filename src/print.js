const columnPadding = 5;

function camelCaseToNormalCase(text) {
  return (
    text[0].toUpperCase() +
    text
      .slice(1)
      .replace(/([A-ZÆØÅ])/, ' $1')
      .toLowerCase()
  );
}

function formatDate(dateObject) {
  const date = dateObject
    .getDate()
    .toString()
    .padStart(2, '0');
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObject.getFullYear();
  return `${date}.${month}.${year}`;
}

function formatAmount(amount) {
  return amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
    .replace('.', ',');
}

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
  const amount = formatAmount(transaction.amount)
    .toString()
    .padStart(amountLength);
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

module.exports = {
  printAccounts,
  printAccount,
  printTransactions
};
