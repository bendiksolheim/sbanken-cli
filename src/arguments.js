function help() {
  console.log(`
  Usage
    $ sb <command>

  where <command> is one of:
    help             Display help text
    balance          Display balance for all accounts
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
