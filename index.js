const {writeFile} = require('fs');
const {resolve} = require('path');
const moment = require('moment');
var http = require("http");

const SANDBOX = '/data';
const srv = http.createServer(function (req, res) {
	var begin = new Date();
    if (req.method == 'POST') {
        var body = '';
        req.on('data', (data) => {
            body += data
        });

        req.on('end', () => {
            for (let event of body.split("\n")) {
                if (event.trim().length > 0) {
                    const fullPath = resolve(SANDBOX, moment().valueOf().toString());
                    //const content = JSON.stringify(request.body, null, 2);

                    writeFile(fullPath, event, function (error) {
                        if (error != null) {
                            console.log(`Error saving ${ content }`);

                            return;
                        }
                    });
                    //processData(timestamp, event)
                    // console.log(event);
                }
            }
        });
    }

    res.writeHead(200);
    res.end();
	var end = new Date();
	console.log(end-begin);
}).listen(80, () => {
    console.log('TestCollector started on port ' + srv.address().port);
});
