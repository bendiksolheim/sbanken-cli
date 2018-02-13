const helpText = `
  Usage
    $ sb <command>

  where <command> is one of:
    account          Display info about specific account
    balance          Display balance for all accounts
    help             Display help text
    transactions     Display transactions for an account

  sb help <command>  Show information about a specific command
`;

function getParameters(arrowFn) {
  return arrowFn
    .toString()
    .split('=>')[0]
    .replace(/\((.*)\)/, '$1')
    .replace(/\s/g, '')
    .split(',')
    .filter(p => p != '')
    .map(p => `<${p}>`)
    .join(' ');
}

const help = (commands, command) => {
  if (command) {
    if (!commands[command]) {
      console.error(`Unknown option '${command}'`);
    } else {
      const parameters = getParameters(commands[command]);
      console.log(`Usage: sb ${command} ${parameters}`);
    }
  } else {
    console.log(helpText);
  }
};

function parse(options, args) {
  const command = args[0];
  if (!command) {
    help();
  } else if (!options[command]) {
    console.error(`Unknown option '${command}'`);
    help();
  } else if (command === 'help' && args.length > 1) {
    help(options, args[1]);
  } else {
    options[command].apply(null, args.slice(1));
  }
}

function create(options) {
  options.help = help;
  return parse.bind(null, options);
}

module.exports = { create };
