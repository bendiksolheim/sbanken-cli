# sbanken-cli

**Note:** this is not in any way affiliated with SBanken.

## What is this

A CLI for the SBanken API ([documentation in Norwegian](https://sbanken.no/bruke/utviklerportalen/)). This module really wants to be installed globally. This CLI requires that you are a customer in [SBanken](https://sbanken.no).

## Installation

Requires Node.js v7.6.0 or higher.

`npm install -g sbanken-cli`

## Usage

```
  Usage
    $ sb <command>

  where <command> is one of:
    account          Display info about specific account
    balance          Display balance for all accounts
    help             Display help text
    transactions     Display transactions for an account
```

It expects a file called `.sbconfig` in your home folder with the following content:

```
{
    "clientId": "...",
    "password": "...",
    "customerId": "..."
}
```

See [SBanken API documentation](https://sbanken.no/bruke/utviklerportalen/) for instructions on how to achieve these.

## Security & Privacy

As this module wants to access your bank account, security and privacy is a big concern. Think twice, and please audit the code, before using it. That said, I do use it myself, if that means anything. To be certain nothing will happen, there are a few really important principles this code will follow:

- It will not in any way phone home. Not even for anonymized usage statistics. Your data will never leave your computer, other than towards the SBanken API.
- It will, as far as possible, not use any third party libraries or npm packages. See [package.json](package.json) for an updated list.
