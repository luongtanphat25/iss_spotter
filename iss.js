const request = require('request');

const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org?format=json';
  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = 'http://ipwho.is/' + ip;

  request(url, (err, _, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  const url = ` https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    const data = JSON.parse(body);

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(err, null);
        return;
      }

      fetchISSFlyOverTimes(coords, (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }

        callback(null, result);
      });
    });

  });
};

// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
