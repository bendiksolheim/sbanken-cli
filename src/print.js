const columnPadding = 5;

function printAccount(nameColumnWidth, account) {
  const nameLength = account.name.length;
  console.log(`${account.name.padEnd(nameColumnWidth)}${account.balance}`);
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
