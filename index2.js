const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printPassTimes } = require('./index');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((err) => {
    console.log("It didn't work: ", err.message);
  });
