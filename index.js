const express = require('express');
const bodyParser = require('body-parser');
const { writeFile } = require('fs');
const { resolve } = require('path');
const moment = require('moment');

const SANDBOX = '/data';

const app = express();
app.use(bodyParser.json());

app.post('/dataapi/dispatchSensorsData', function(request, response) {
  const auth = request.headers['statwolf-auth'];

  if(auth == null || auth !== 'porcia.worker:statwolf2020') {
    response.send(401);

    return;
  }

  const fullPath = resolve(SANDBOX, moment().unix().toString());
  const content = JSON.stringify(request.body, null, 2);

  writeFile(fullPath, content, function(error) {
    if(error != null) {
      res.send(400, error);

      return;
    }

    response.json({
      Success: true,
      Data: {
        message: "this is a mock endpoint to test connectivity"
      }
    });
  });
});

app.listen(80, '0.0.0.0', function() {
  console.log('Service running on http://0.0.0.0:80');
});
