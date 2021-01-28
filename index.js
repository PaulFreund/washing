const http = require("http");
const workers = require('./workers');

async function processData(event) {
    workers.forEach(function(worker) {
        worker({
            event
        });
    });
}

const srv = http.createServer(function (req, res) {
    if(req.method == 'POST') {
        var body = '';
 
        req.on('data', (data) => {
            body += data
        });
 
        req.on('end', () => {
            for(let event of body.split("\n")) {
                if(event.trim().length > 0) {
                    processData(event)
                }
            }
        });
    }

    res.writeHead(200);
    res.end();

}).listen(80, () => {
    console.log('TestCollector started on port ' + srv.address().port);
});
