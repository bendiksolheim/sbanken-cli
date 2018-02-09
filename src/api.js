const request = require('./request');

const hostname = 'api.sbanken.no';

function btoa(str) {
  return Buffer.from(str).toString('base64');
}

function accessToken(clientId, passwd) {
  const tokenEndpoint = '/identityserver/connect/token';
  const payload = 'grant_type=client_credentials';
  const basicAuth = btoa(`${clientId}:${passwd}`);

  const options = {
    hostname: hostname,
    path: tokenEndpoint,
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return request
    .post(options, payload)
    .then(response => response['access_token']);
}

function accounts(accessToken, customerId) {
  const accountsEndpoint = `/bank/api/v1/accounts/${customerId}`;

  const options = {
    hostname: hostname,
    path: accountsEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  };

  return request.get(options);
}

function transactions(accessToken, customerId, accounts, accountName) {
  const account = accounts.find(a => a.name === accountName);

  if (!account) {
    return Promise.reject(
      `Account '${accountName}' not found. Available accounts: ${accounts
        .map(a => a.name)
        .join(', ')}`
    );
  }

  const transactionsEndpoint = `/bank/api/v1/transactions/${customerId}/${
    account.accountNumber
  }`;
  const options = {
    hostname: hostname,
    path: transactionsEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  };

  return request.get(options);
}

function accountInfo(accessToken, customerId, accounts, accountName) {
  const account = accounts.find(a => a.name === accountName);

  if (!account) {
    return Promise.reject(
      `Account '${accountName}' not found. Available accounts: ${accounts
        .map(a => a.name)
        .join(', ')}`
    );
  }

  const accountInfoEndpoint = `/bank/api/v1/accounts/${customerId}/${
    account.accountNumber
  }`;
  const options = {
    hostname: hostname,
    path: accountInfoEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  };

  return request.get(options);
}

module.exports = {
  accessToken,
  accounts,
  transactions,
  accountInfo
};
