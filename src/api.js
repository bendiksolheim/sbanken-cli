const request = require('./request');
const { btoa } = require('./format');

const hostname = 'api.sbanken.no';

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  };
}

function accessToken(clientId, passwd) {
  const payload = 'grant_type=client_credentials';
  const basicAuth = btoa(`${clientId}:${passwd}`);

  const options = {
    hostname: hostname,
    path: '/identityserver/connect/token',
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
  const options = {
    hostname: hostname,
    path: `/bank/api/v1/accounts/${customerId}`,
    headers: headers(accessToken)
  };

  return request.get(options);
}

function transactions(accessToken, customerId, accounts, accountName) {
  const { accountNumber } = accounts.find(a => a.name === accountName);

  if (!accountNumber) {
    return Promise.reject(
      `Account '${accountName}' not found. Available accounts: ${accounts
        .map(a => a.name)
        .join(', ')}`
    );
  }

  const options = {
    hostname: hostname,
    path: `/bank/api/v1/transactions/${customerId}/${accountNumber}`,
    headers: headers(accessToken)
  };

  return request.get(options);
}

function accountInfo(accessToken, customerId, accounts, accountName) {
  const { accountNumber } = accounts.find(a => a.name === accountName);

  if (!{ accountNumber }) {
    return Promise.reject(
      `Account '${accountName}' not found. Available accounts: ${accounts
        .map(a => a.name)
        .join(', ')}`
    );
  }

  const options = {
    hostname: hostname,
    path: `/bank/api/v1/accounts/${customerId}/${accountNumber}`,
    headers: headers(accessToken)
  };

  return request.get(options);
}

module.exports = {
  accessToken,
  accounts,
  transactions,
  accountInfo
};
