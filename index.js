// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(ip);
//   fetchCoordsByIP(ip, (err, geo) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     fetchISSFlyOverTimes(geo, (err, data) => {
//       if (err) {
//         console.log(err);
//         return;
//       }

//     });
//   });
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  
  printPassTimes(passTimes);
});
