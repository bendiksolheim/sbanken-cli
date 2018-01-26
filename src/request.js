const https = require('https');

function request(options, data) {
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

    if (data) {
      req.write(data);
    }

    req.end();
  });
}

function get(options) {
  options.method = 'GET';
  return request(options);
}

function post(options, data) {
  options.method = 'POST';
  return request(options, data);
}

module.exports = {
  get,
  post
};
