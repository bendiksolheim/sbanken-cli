# sbanken-cli

**Note:** this is not in any way affiliated with SBanken.

## What is this

A CLI for SBanken (using their public api:
[documentation](https://sbanken.no/bruke/utviklerportalen/)), so your can do
your banking straight from the terminal. It requires that you are a customer in
[SBanken](https://sbanken.no).

## Installation

Requires Node.js v7.6.0 or higher. This package really wants to be installed
globally.

`npm install -g sbanken-cli`

## Usage

```
$ sb help
  Usage
    $ sb <command>

  where <command> is one of:
    account             Display info about specific account
    balance             Display balance for all accounts
    help                Display help text
    transactions        Display transactions for an account
    transfer            Transfer between accounts

  sb help <command>     Show information about a specific command
```

It expects to find the file `.sbconfig` in your home folder with the following
content:

```
{
    "clientId": "...",
    "password": "...",
    "customerId": "..."
}
```

See [SBanken API documentation](https://sbanken.no/bruke/utviklerportalen/) for
instructions on how to get these.

## Security & Privacy

As this tool wants to access your bank account, security and privacy is a big
concern. Think twice, and maybe even read the code, before using it. That said,
I do use it myself, if that means anything. To be certain nothing will happen,
there are two really important principles this code will follow:

- It will not in any way phone home, or to a third party. Not for anonymized
  usage statistics, not for anything else. Your data will never leave your
  computer, other than towards the SBanken API.
- It will, as far as possible, not use any third party libraries or npm
  packages. See [package.json](package.json) under dependencies for an updated
  list.

