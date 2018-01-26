const columnPadding = 5;

function formatAmount(amount) {
  return amount
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
    .replace('.', ',');
}

function printAccount(nameColumnWidth, account) {
  const nameLength = account.name.length;
  console.log(
    `${account.name.padEnd(nameColumnWidth)}${formatAmount(account.balance)}`
  );
}

function printAccounts(accounts) {
  const nameLength = accounts.items.reduce(
    (acc, cur) => (cur.name.length > acc ? cur.name.length : acc),
    0
  );
  accounts.items.forEach(account =>
    printAccount(nameLength + columnPadding, account)
  );
}

module.exports = {
  printAccounts,
  printAccount
};
