const fetch = require('node-fetch');

const ENDPOINT = 'http://electrolux-porcia-plant.statwolf.com/dataapi/dispatchSensorsData'

module.exports = function(opts) {
  fetch(ENDPOINT, {
    method: 'POST',
    body: opts.body,
    headers: {
      'Content-Type': 'application/json',
      'statwolf-auth': 'porcia.worker:statwolf2020'
    }
  }).then(function(res) {
    return res.json();
  }).then(function(data) {
    console.log(data);
  });
};
