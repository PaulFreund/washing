const express = require('express');
const { writeFile } = require('fs');
const { resolve } = require('path');
const moment = require('moment');

const SANDBOX = '/data';

const app = express();

app.use(function(req, res, next) {
  req.body = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) { 
    req.body += chunk;
  });

  req.on('end', function() {
    next();
  });
});

app.post('/dataapi/dispatchSensorsData', function(request, response) {
  const auth = request.headers['statwolf-auth'];

  if(auth == null || auth !== 'porcia.worker:statwolf2020') {
    response.send(401);

    return;
  }

  console.log(request.headers);
  console.log(request.body);

  const fullPath = resolve(SANDBOX, moment().valueOf().toString());
  //const content = JSON.stringify(request.body, null, 2);

  writeFile(fullPath, request.body, function(error) {
    if(error != null) {
      console.log(`Error saving ${ content }`);

      return;
    }
  });

  response.json({
    Success: true,
    Data: {
      message: "this is a mock endpoint to test connectivity"
    }
  });
});

app.listen(80, '0.0.0.0', function() {
  console.log('Service running on http://0.0.0.0:80');
});
