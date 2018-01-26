const request = require('./request');

const hostname = 'api.sbanken.no';

function btoa(str) {
  return Buffer.from(str).toString('base64');
}

function getAccessToken(clientId, passwd) {
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

module.exports = {
  getAccessToken,
  accounts
};
