const https = require('https');

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
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return new Promise(function(resolve, reject) {
    const req = https.request(options, res => {
      let response = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => (response += chunk));
      res.on('end', () => resolve(JSON.parse(response)['access_token']));
    });

    req.on('error', error => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

function accounts(accessToken, customerId) {
  const accountsEndpoint = `/bank/api/v1/accounts/${customerId}`;

  const options = {
    hostname: hostname,
    path: accountsEndpoint,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json'
    }
  };

  return new Promise(function(resolve, reject) {
    const req = https.request(options, res => {
      let response = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => (response += chunk));
      res.on('end', () => resolve(JSON.parse(response)));
    });

    req.on('error', error => {
      reject(error);
    });

    req.end();
  });
}

module.exports = {
  getAccessToken,
  accounts
};
