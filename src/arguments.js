function help() {
  console.log(`
  Usage
    $ sb <command>

  where <command> is one of:
    account          Display info about specific account
    balance          Display balance for all accounts
    help             Display help text
    transactions     Display transactions for an account
  `);
}

function parse(options, args) {
  const command = args[0];
  if (!command || !options[command]) {
    help();
  } else {
    options[command].apply(null, args.slice(1));
  }
}

function create(options) {
  options.help = help;
  return parse.bind(null, options);
}

module.exports = { create };
