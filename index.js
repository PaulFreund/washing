const http = require("http");
const workers = require('./workers');

const srv = http.createServer(function(req, res) {
  const begin = new Date();

  if (req.method !== 'POST') {
    res.statusCode = 400;
    res.end();

    return;
  }

  let body = '';

  req.on('data', (data) => {
    body += data
  });

  req.on('end', () => {
    workers.forEach(function(worker) {
      worker({
        body
      });
    });
  });

  res.statusCode = 200;
  res.end();

  console.log(`Time: ${ new Date() - begin }`);
}).listen(80, () => {
  console.log('TestCollector started on port ' + srv.address().port);
});
